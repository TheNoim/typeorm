import {Entity} from "../../../../src/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "../../../../src/decorator/columns/Column";

export enum TestEnum1 {
    VALUE1 = "VALUE1"
}

@Entity({ name: "post" })
export class Post1 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: TestEnum1, enumName: "TestEnum", type: "enum", array: true })
    testEnum: TestEnum1[];
}
