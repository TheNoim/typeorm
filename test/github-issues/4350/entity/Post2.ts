import {Entity} from "../../../../src/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "../../../../src/decorator/columns/Column";

export enum TestEnum2 {
    VALUE1 = "VALUE1",
    VALUE2 = "VALUE2"
}

@Entity({ name: "post" })
export class Post2 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: TestEnum2, enumName: "TestEnum", type: "enum", array: true })
    testEnum: TestEnum2[];
}
