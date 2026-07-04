import mongoose from 'mongoose';
import dns from 'dns';

// Use Google/Cloudflare DNS to resolve MongoDB Atlas SRV records.
// Some resolvers (notably many Windows/ISP setups) refuse the SRV lookups that
// `mongodb+srv://` requires, causing `querySrv ECONNREFUSED`. Forcing a public
// resolver that supports SRV fixes the connection in dev AND production.
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
    // setServers can throw on some platforms; SRV then falls back to the OS resolver.
}

// NOTE: the MONGODB_URI check is done lazily inside dbConnect() (not at module
// load) so `next build` can import the portfolio API route modules even when the
// env var isn't present at build time. It only throws if an actual DB connection
// is attempted without a URI (i.e. at request time).
function resolveMongoUri(): string {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable (in .env / hosting env)'
        );
    }

    // `mongodb+srv://` requires DNS SRV lookups, which many networks (and some
    // hosts) refuse — producing `querySrv ECONNREFUSED`. For this Atlas cluster we
    // rewrite the SRV URI to a direct multi-host connection that needs no SRV, so it
    // works regardless of the resolver. Set MONGODB_FORCE_SRV=true to opt out (e.g.
    // if the shard hostnames below ever change) and use the SRV string as-is.
    let resolvedUri = MONGODB_URI;

    if (
        process.env.MONGODB_FORCE_SRV !== 'true' &&
        resolvedUri.startsWith('mongodb+srv://') &&
        resolvedUri.includes('cluster1.avswby5.mongodb.net')
    ) {
        resolvedUri = resolvedUri.replace('mongodb+srv://', 'mongodb://')
            .replace('@cluster1.avswby5.mongodb.net', '@ac-xx4tngq-shard-00-00.avswby5.mongodb.net:27017,ac-xx4tngq-shard-00-01.avswby5.mongodb.net:27017,ac-xx4tngq-shard-00-02.avswby5.mongodb.net:27017');

        resolvedUri += (resolvedUri.includes('?') ? '&' : '?') + 'ssl=true&replicaSet=atlas-raz2sa-shard-0&authSource=admin';
    }

    return resolvedUri;
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(resolveMongoUri(), opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
