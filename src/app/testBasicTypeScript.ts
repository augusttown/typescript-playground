//

function main(): void {
  //testLoadLibrary();
}

function test(): void {
  console.log("");
}

// test basic types
function testBasicTypeScript() {

  let isVisible: boolean = true;
  let isVisible1 = true;  // type inference

  let numVar: number = 2.54;
  let dec: number = 27;
  let hex: number = 0x001b;
  let binary: number = 0b11011;
  let octal: number= 0o0033;

  let firstName: string ="T homas";
  let message: string = "Welcome ${firstName}, how are you?";
  let message1 = "Welcome " + firstName + ",\nhow are you?";

  // array
  let arrayVar: string[] = ["T homas", "Sara", "Julia"];
  let arrayVar1: Array<string> = ["T homas", "Sara", "Julia"];

  for (let value of arrayVar) {
    console.log(value);
  }

  for (let index in arrayVar) {
    console.log(index);
    console.log(`${index} - ${arrayVar[index]}`);
  }

  // objects
  interface ObjectVar {
    firstName:string
    lastName:string
  };

  let obj: ObjectVar = { firstName: "value1", lastName: "value2"};

  let value1 = obj.firstName;
  let value2 = obj.lastName;

  for (let key in obj) {
    console.log(`${key}:`);
    //console.log(`${obj[key]}:`);  // TODO: why compiler complains here
    //console.log(`${key}: ${obj[key]}`);
  }

  // tuples
  let tupleVar: [string, boolean] = ["yingqi", true];

  // enums
  enum EnumType {east, south, west, north}
  let direction: EnumType = EnumType.east
  let eastIndx: number = EnumType.south
  let eastStrValue: string = EnumType[EnumType.east]
  let eastNumberValue: number = EnumType["east"]

  // any type
  let anyVar: any = true; // Initialized with boolean
  console.log(typeof anyVar); // Logs "boolean"
  anyVar = "hidden"; // String assignment works as well
  console.log(typeof anyVar); // Logs "string"
  //anyVar.SomeNonExistingFunction(); // run-time error only

  // type assertion
  anyVar = "hello";
  numVar = (anyVar as string).length
  numVar = (<string>anyVar).length

  //let inputVar = document.getElementById("myInput");
  let inputVar = document.getElementById("btn1") as HTMLInputElement;
  let value: string = inputVar.value;
  console.log(value)

  // union types
  let isVisibleUnion: boolean|number = true;
  isVisibleUnion = 1;

  function takeBooleanOrNumber(input: boolean|number) {
    console.log("No error");
  }

  takeBooleanOrNumber(true);  // no error

  // function return types
  function logIt(input: string): void {
    console.log(input);
  }

  function doSomething(): never {
    throw new Error("Not implemented");
  }

  // Undefined, null, and Null
  let stringVar = "string";
  stringVar = undefined;
  stringVar = null;

  // var, let and const
  function varConstAndLet(init: boolean) {
    if (init) {
      let x: number = 1;
      console.log(x);
      const z: number = 3;
      //z = 4;  // const cannot be reassigned
    } else {
      var y: number = 2;
    }
    //console.log(x); // let is block scoped
    console.log(y);
    //
    let x: string = "T homas";  //  redeclare x
    console.log(x);
  }
}
//
// test basic classes and interfaces
function testBasicClassesAndInterfaces() {
  // interfaces
  interface IPerson {
    firstName: string
    lastName?: string
  }

  function testIPerson(p: IPerson) {
    return p.firstName + " " + p.lastName;
  }

  let tom: IPerson = {firstName: "tom", lastName: "sawyer"};
  testIPerson(tom);
  testIPerson({firstName: "mary", lastName: "kay"});
  testIPerson({firstName: "donald"});

  // classes
  class Person {

    firstName: string;
    lastName?: string;

    constructor(firstName: string, lastName?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    getFullName(): string {
      let fullName = this.firstName;
      if(this.lastName) {
        fullName+= " "+this.lastName;
      }
      return fullName;
    }
  }

  let p1 = new Person("Tom", "Sawyer");
  let p2 = new Person("Peter", "Parker");

  function testPerson(p: Person) {
    return p.getFullName();
  }
  testPerson(p1);

  class Person2 implements IPerson {
    firstName: string
    lastName?: string

    constructor(firstName: string, lastName?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

  function testPerson2(p: Person2) {}

  let p3: Person2 = new Person2("", "");
  testIPerson(p3);
  testPerson2(p3);

  interface IPerson2 {
    getFullName: any  // TODO: can it be function type?
  }

  class Person3 implements IPerson2 {

    firstName: string;
    lastName?: string;

    constructor(firstName: string, lastName?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    getFullName(): string {
      let fullName = this.firstName;
      if(this.lastName) {
        fullName+= " "+this.lastName;
      }
      return fullName;
    }
  }

  function testPerson3(p: Person3) {}
  function testIPerson2(p: IPerson2) {}

  let p4 = new Person3("", "");
  let ip4 = {
    getFullName: function () {return "";}
  };

  testPerson3(p4);
  testIPerson2(ip4);

  console.log(p4 instanceof Person3);

  class Person4 {
    private firstName: string
    protected lastName: string

    constructor (firstName: string, lastName: string) {
      this.firstName = firstName;
    }
  }

  let p5 = new Person4("", "");
  //p5.firstName; // cannot access private

  class Person5 extends Person4 {

    private age: number

    constructor (firstName: string, lastName: string, age: number) {
      super(firstName, lastName);
      this.age = age;
    }

    getLastName(): string {
      return this.lastName; // can access protected peoperties of parent class
    }

    getAge(): number {
      return this.age;
    }
  }

  class Person6 {

    public readonly age: number

    constructor(public firstName: string, age: number) {}  // short-cut to declare properties
  }

  let p6 = new Person6("", 1);
  //p6.age = 1;

  class Person7 {

    static personCount: number = 0;

    private _firstName: string;

    constructor(firstName: string) {
      this._firstName = firstName;
      Person7.personCount++;
    }

    set firstName(value: string) {  // set accessor
      this._firstName = value;
    }

    get firstName(): string {  // get accessor
      return this._firstName;
    }
  }

  abstract class PersonProtoType {
    constructor(public firstName: string) {}
    abstract sayHello(): void;
  }

  class American extends PersonProtoType {

    constructor(firstName: string) {
      super(firstName);
    }

    sayHello() {
      console.log("Hello");
    }
  }

  class Hispanic extends PersonProtoType {

    constructor(firstName: string) {
      super(firstName);
    }

    sayHello() {
      console.log("Hola");
    }
  }

  class Person8 {
    constructor(public firstName: string, public lastName?: string, public age: number = 20) {
      this.firstName = firstName;
      this.lastName = this.lastName;
      this.age = age;
    }
  }

  let p7 = new Person8("1");
  console.log(p7.firstName);
  console.log(p7.lastName);
  console.log(p7.age);

  console.log(p7 instanceof Person8);

  // destructuring
  let {firstName: fName, lastName: lName} = new Person8("", "");
  console.log(fName);
  console.log(lName);

  var {lastName, age} = new Person8("", "", 1);

  function returnFirstAndLastName(): Person8 {
    return new Person8("","",1);
  }
  var {lastName, age} = returnFirstAndLastName();

  // generic types and classes

  interface IRepository<T> {
    getAll(): T[];
    insert(item: T): void;
  }

  class GenericRepo<T> implements IRepository<T> {

    private _items: Array<T> = new Array<T>();

    getAll(): T[] {
      return this._items;
    }

    insert(item: T): void {
      this._items.push(item);
    }

    /*getById(id: number) {
      return this._items.filter(item => item.id === id)[0];
    }*/

  }

  let person8Repo = new GenericRepo<Person8>();
  person8Repo.insert(new Person8("", "", 1));
  person8Repo.getAll();


  interface IHaveId {
    id: number;
  }

  class GenericRepo2<T extends IHaveId> {

    private _items: Array<T> = new Array<T>();

    getById(id: number) {
      return this._items.filter(item => item.id === id)[0];
    }

  }

  class Dictionary<TKey, TValue> {

    private _items = new Array<[TKey, TValue]>();

    getItem(key: TKey): TValue {
      let foundItems = this._items.filter(item => item[0] == key);
      if(foundItems.length!=1)
      {
        throw new Error("Item with key does not exist");
      }
      return foundItems[0][1]; // Grab the tuple ([0]) and
      // then the value ([1])
    }

    add(key: TKey, value: TValue): void {
      let keyExists = this._items.filter(item => item[0] == key).length > 0;
      if (keyExists) {
        throw new Error("Key exists already");
      }
      this._items.push([key, value]);
    }
  }

  var dict = new Dictionary<number,string>();
  dict.add(1,"T homas");
  dict.add(2,"Julia");
  dict.add(3,"Anna");

  let firstName2:string= dict.getItem(2);
  console.log(firstName2); // Logs “Julia”

}
//
// test basic functions
function testBasicFunctions() {

  //let add = function(x: number, y: number): number {return x + y;};                                   // infer types
  let add: (a: number, b: number) => number = function(x: number, y: number): number { return x + y; }; // types explicitly

  // optional parameters
  function getFullName1(firstName: string, lastName?: string) : string {
    if (lastName)
      return `${firstName} ${lastName}`;
    else
      return firstName;
  }

  // default parameter values
  function getFullName2(firstName: string = "Julia",lastName?: string) {
    if (lastName)
      return `${firstName} ${lastName}`;
    else
      return firstName;
  }

  // rest parameters
  function getFullName3(firstName: string, ...moreNames: string[]) {
    return firstName + " " + moreNames.join(" ");
  }
  console.log(getFullName3("T homas", "Claudius", "Huber", "Developer"));

  let additionalNames: string[]= ["Claudius", "Huber", "Developer"];
  console.log(getFullName3("T homas", ...additionalNames));

  // function as parameter
  class Person {
    getPersonalArchive(callback: (name: string)=>void): void {
      callback("");
    }
  }
  let p = new Person();
  p.getPersonalArchive(function(name: string) {
    // TODO:
  })

  //
  interface IGetPersonalArchiveCallback {
    (name: string): void
  }
  class Person1 {
    getPersonalArchive(callback: IGetPersonalArchiveCallback) {
      callback("");
    }
  }
  //
  class Person2 {

    private _name: string;

    setNameAsync(): void {
      let _this = this;
      this.loadName(function(name) {
        // this refers to context of the function, not class instance
        _this._name = name;
      });
    }

    setNameAsync2(): void {
      //
      // using Arrow function so "this" refers class instance within callback body
      this.loadName((name) => {
        this._name = name;
      });
    }

    loadName(callback: (name: string)=>void): void {
      let loadedName = "";
      callback(loadedName);
    }
  }
}
//
// test async and await
function testAsyncAndAwait() {
  /*
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function testAwait() {
    await delay(1000);
    console.log("T his");
    await delay(1000);
    console.log("is ");
    await delay(1000);
    console.log("ASYNC!");
  }

  testAwait();
  */
}
//
// declare function
/*interface Person {
  firstName: string;
}
declare function printFirstName(p: Person): void;

function tesBasicLibrary() {
  let p = { firstName: "T homas" };
  printFirstName(p);
}*/
//
/*import { range } from 'lodash'
function testLoadLibrary() {
  let t = range(1,12);
  for (let i in t) {
    console.log(i);
  }
}*/
//


