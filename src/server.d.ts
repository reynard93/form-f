/// <reference types="miragejs" />
export declare function makeServer({ environment }?: {
    environment?: string | undefined;
}): import("miragejs").Server<import("miragejs").Registry<{
    institution: import("miragejs/-types").ModelDefinition<{}>;
    document: import("miragejs/-types").ModelDefinition<{}>;
}, import("miragejs/-types").AnyFactories>>;
