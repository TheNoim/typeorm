import "reflect-metadata";
import {closeTestingConnections, createTestingConnections} from "../../utils/test-utils";
import {Post1, TestEnum1} from "./entity/Post1";
import {Post2, TestEnum2} from "./entity/Post2";
import {Post3} from "./entity/Post3";
import {Post4} from "./entity/Post4";
import {Connection} from "../../../src";
import {expect} from "chai";

describe("github issues > #4350 Array of enums column doesn't work at all", () => {
    let connections: Connection[];
    afterEach(() => closeTestingConnections(connections));
    after(() => closeTestingConnections(connections));

    it("should migrate postgres enums correctly", async () => {
        connections = await createTestingConnections({
            entities: [__dirname + "/entity/Post1{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["postgres"]
        });

        await Promise.all(connections.map(async connection => {
            let repo = connection.getRepository(Post1);

            let post = new Post1();
            post.testEnum = [TestEnum1.VALUE1];

            post = await repo.save(post);

            post.id.should.exist;
            post.testEnum.should.be.an("array").that.includes(TestEnum1.VALUE1);
        }));

        await closeTestingConnections(connections);

        connections = await createTestingConnections({
            entities: [__dirname + "/entity/Post2{.js,.ts}"],
            schemaCreate: true,
            dropSchema: false,
            enabledDrivers: ["postgres"]
        });

        await Promise.all(connections.map(async connection => {
            let repo = connection.getRepository(Post2);

            let post = await repo.findOne() as Post2;

            expect(post).to.exist;
            post.testEnum = [...post.testEnum, TestEnum2.VALUE2];

            post = await repo.save(post);

            post.id.should.exist;
            post.testEnum.should.be.an("array").that.includes(TestEnum2.VALUE1).and.that.includes(TestEnum2.VALUE2);
        }));
    });

    it('should migrate enum array to non array and back', async () => {
        connections = await createTestingConnections({
            entities: [__dirname + "/entity/Post2{.js,.ts}"],
            schemaCreate: true,
            dropSchema: false,
            enabledDrivers: ["postgres"]
        });

        await Promise.all(connections.map(async connection => {
            let repo = connection.getRepository(Post2);

            let post = await repo.findOne() as Post2;

            expect(post).to.exist;

            post.id.should.exist;
            post.testEnum.should.be.an("array").that.includes(TestEnum2.VALUE1).and.that.includes(TestEnum2.VALUE2);
        }));

        await closeTestingConnections(connections);

        connections = await createTestingConnections({
            entities: [__dirname + "/entity/Post3{.js,.ts}"],
            schemaCreate: true,
            dropSchema: false,
            enabledDrivers: ["postgres"]
        });

        await Promise.all(connections.map(async connection => {
            let repo = connection.getRepository(Post3);

            let post = await repo.findOne() as Post3;

            expect(post).to.exist;

            expect(post.testEnum).to.exist;

            post.testEnum.should.not.be.an('array');
        }));

        await closeTestingConnections(connections);

        connections = await createTestingConnections({
            entities: [__dirname + "/entity/Post4{.js,.ts}"],
            schemaCreate: true,
            dropSchema: false,
            enabledDrivers: ["postgres"]
        });

        await Promise.all(connections.map(async connection => {
            let repo = connection.getRepository(Post4);

            let post = await repo.findOne() as Post4;

            expect(post).to.exist;

            post.testEnum.should.be.an('array');
        }));
    })
});
