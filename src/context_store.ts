import { Collection } from "mongodb";
import { Context } from "./context.ts";


export interface ContextStore {
    save: (context: Context) => Promise<Context>;
    findAllForTopic: (internId: string, topicId: string) => Promise<Context[]>;
}

export class ContextStoreImpl implements ContextStore {
    private readonly collection: Collection<Context>;

    constructor(collection: Collection<Context>) {
        this.collection = collection;
    }

    async save(context: Context): Promise<Context> {
        await this.collection.insertOne({ ...context });
        return context;
    }

    findAllForTopic(internId: string, topicId: string): Promise<Context[]> {
        return this.collection.find({internId, topicId}).toArray();
    }
}

