import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableDisciplina1699385443651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "disciplina",
              columns: [
                {
                  name: "codigo",
                  type: "integer",
                  unsigned: true,
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "nome",
                  type: "varchar",
                },
                {
                  name: "curso_codigo",
                  type: "integer",
                  unsigned: true,
                },
              ],
              foreignKeys: [
                {
                  name: "disciplina_curso_fk",
                  columnNames: ["curso_codigo"],
                  referencedTableName: "curso",
                  referencedColumnNames: ["codigo"],
                  onUpdate: "CASCADE",
                  onDelete: "CASCADE"
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("disciplina");
    }

}
