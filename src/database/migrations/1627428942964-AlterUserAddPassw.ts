import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPassw1627428942964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "senha",
                type: "varchar",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "senha")
    }

}
