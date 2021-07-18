import { schemaNormalizer } from '@sanity-codegen/schema-codegen';
import { generateGroqTypes } from './generate-groq-types';
import { exampleSchema } from './__example-files__/example-schema';

describe('generateGroqTypes', () => {
  // TODO: better tests lol
  it('works', async () => {
    const result = await generateGroqTypes({
      cwd: __dirname,
      filenames: './__example-files__/**/*.ts',
      schema: schemaNormalizer(exampleSchema),
    });

    expect(result).toMatchInlineSnapshot(`
      "/// <reference types=\\"@sanity-codegen/types\\" />

      declare namespace Sanity {
        namespace Queries {
          type AllBooks = {
            _type: \\"book\\";
            _id: string;
            title?: string;
            author?: {
              name?: string;
            };
            description?: Ref_44wbp4;
          }[];
          type BookAuthor = {
            name?: string;
          } | null;
          type BookTitles = (string | null)[];

          type Ref_44wbp4 = {
            _key: string;
            _type: \\"block\\";
            children: {
              _key: string;
              _type: \\"span\\";
              marks?: unknown[];
              text?: string;
            }[];
            markDefs?: unknown[];
            style?: string;
          }[];

          /**
           * A keyed type of all the codegen'ed queries. This type is used for
           * TypeScript meta programming purposes only.
           */
          type QueryMap = {
            BookAuthor: BookAuthor;
            BookTitles: BookTitles;
            AllBooks: AllBooks;
          };
        }
      }
      "
    `);
  });
});
