import {Entity} from "../../../../src/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "../../../../src/decorator/columns/Column";
import {TestEnum2} from "./Post2";

@Entity({ name: "post" })
export class Post4 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: TestEnum2, enumName: "TestEnum", type: "enum", array: true })
    testEnum: TestEnum2[];
}
