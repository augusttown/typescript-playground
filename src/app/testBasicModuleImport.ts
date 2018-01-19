//import { Person } from './testBasicModuleExport.js';          // import single class
import { Person, Company, testExportFunction, testExportVariable } from './testBasicModuleExport.js'; // import multiple classes
//import { Person, Company as Institution } from './testBasicModuleExport.js'; // import multiple classes with alias
//import * as PAndC from './testBasicModuleExport.js';

// load lodash
import _ from 'lodash';
//import * as _ from "lodash";  // TODO: this syntax doesn't work for lodash
// load d3
import * as d3 from 'd3';

function testBasicModuleImport(): void {
  let p = new Person("Donald Trump", 70);
  console.log(p.name);

  let c = new Company("USA", 100);
  console.log(c.name);

  //let i = new Institution("USA", 100);
  //console.log(i.name);
  console.log(_.camelCase("donaldtrump"));

  d3.json("data/data.json", function(error, data){
    console.log(error);
  });

  testExportFunction();

  for (let v in testExportVariable) {
    console.log(v);
  }
}

testBasicModuleImport();
