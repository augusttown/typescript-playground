//import { Person } from './testBasicModuleExport.js';          // import single class
import { Person, Company, testExportFunction, testExportVariable } from './testBasicModuleExport.js'; // import multiple classes
//import { Person, Company as Institution } from './testBasicModuleExport.js'; // import multiple classes with alias
//import * as PAndC from './testBasicModuleExport.js';

function testBasicModuleImport(): void {
  let p = new Person("Donald Trump", 70);
  console.log(p.name);

  let c = new Company("USA", 100);
  console.log(c.name);

  //let i = new Institution("USA", 100);
  //console.log(i.name);

  testExportFunction();

  for (let v in testExportVariable) {
    console.log(v);
  }
}

testBasicModuleImport();
