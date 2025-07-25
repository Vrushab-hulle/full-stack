import { fireEvent, render, screen, configure } from "@testing-library/react";
import App from "../../App";
import cleanDb from "../service";
import handleOtherMethod from "../helper";
import userEvent from "@testing-library/user-event";
import User from "../User";

// test('function defination','callback','timeout(optional)')
//test and expect is part of jest
//render and screen is part of rtl

// test("Test First React app case", () => {
//   render(<App />);
//   const text = screen.getByText(/First React Test Case/);
//   const title = screen.getByTitle(/Ai Image/);
//   expect(text).toBeInTheDocument();
//   expect(title).toBeInTheDocument();
// });

// test("Testing input box", () => {
//   render(<App />);
//   let checkInput = screen.getByRole("textbox");
//   expect(checkInput).toBeInTheDocument();
//   let checkInputPlaceHolder = screen.getByPlaceholderText("enter username");
//   expect(checkInputPlaceHolder).toBeInTheDocument();
//   expect(checkInput).toHaveAttribute("name", "username");
//   expect(checkInput).toHaveAttribute("id", "userId");
//   // expect(checkInput).toHaveAttribute('type','text');
// });

// describe("UI test case group", () => {
//   test("ui test case 1", () => {
//     render(<App />);
//     let checkInput = screen.getByRole("textbox");
//     expect(checkInput).toBeInTheDocument();
//   });
// });

// describe("Api test case group", () => {
//   test("api test case 1", () => {
//     render(<App />);
//     let checkInput = screen.getByRole("textbox");
//     expect(checkInput).toBeInTheDocument();
//   });

//   describe("inner describe test group", () => {
//     test("api test case 2", () => {
//       render(<App />);
//       let checkInput = screen.getByRole("textbox");
//       expect(checkInput).toHaveAttribute("name", "username");
//     });
//   });
// });

// test("on change event testing", () => {
//   render(<App />);
//   let input = screen.getByRole("textbox");
//   fireEvent.change(input, { target: { value: "a" } });
//   expect(input.value).toBe("a");
// });

// beforeAll(() => {
//   console.log("************ before All ***********");
// });
// beforeEach(() => {
//   console.log("************ before Each ***********");
//   cleanDb();
// });

// test("clcik event test case", () => {
//   console.log("1");

//   render(<App />);
//   const btn = screen.getByRole("button");
//   fireEvent.click(btn);
//   expect(screen.getByText("updated data")).toBeInTheDocument();
// });

// test("clcik event test case2", () => {
//   console.log("2");
//   render(<App />);
//   const btn = screen.getByRole("button");
//   fireEvent.click(btn);
//   expect(screen.getByText("updated data")).toBeInTheDocument();
// });

// afterAll(() => {
//   console.log("________ after all _________");
// });

test('snapshot for app component',()=>{
  const container = render(<App/>)
  expect(container).toMatchSnapshot()
})

// test("method testing case 1", () => {
//   render(<App />);
//   const btn = screen.getByTestId("btn1");
//   fireEvent.click(btn);
//   expect(screen.getByText("Hello")).toBeInTheDocument();
// });

// test("method testing case 2", () => {
//   expect(handleOtherMethod()).toMatch("hii");
// });

//getByRole section

// test("get by Role", () => {
//   render(<App />);
//   const inputFile = screen.getByRole("textbox");
//   expect(inputFile).toBeInTheDocument();
//   expect(inputFile).toHaveValue("hello");
//   expect(inputFile).toBeDisabled();
// });

//  Custom Role Section

// test("get by Role", () => {
//   render(<App />);
//   const btn1 = screen.getByRole("button", { name: "Click 1" });
//   expect(btn1).toBeInTheDocument();
//   const btn2 = screen.getByRole("button", { name: "Click 2" });
//   expect(btn2).toBeInTheDocument();
//   const text = screen.getByRole("textbox",{name:'User Name'});
//   expect(text).toBeInTheDocument();
//  //custom role for non-semantic tags
//   const div = screen.getByRole("dummy");
//   expect(div).toBeInTheDocument();
// });

//getAllByRole Section

// test("get All By Role", () => {
//   render(<App />);
//   const btn = screen.getAllByRole("button");
//   // expect(btn[0]).toBeInTheDocument();
//   for (let i = 0; i < btn.length; i++) {
//     expect(btn[i]).toBeInTheDocument();
//   }
// });

//get By Label Text

// test("get by label text", () => {
//   render(<App />);
//   const input = screen.getByLabelText("UserName");
//   expect(input).toBeInTheDocument();
//   expect(input).toHaveValue("kiran");

//   const checkbox = screen.getByLabelText("Skills");
//   expect(checkbox).toBeInTheDocument();
//   expect(checkbox).toBeChecked();
// });

// get by test id and overidin test id
// configure({ testIdAttribute: "element-id" });
// test("get by test id", () => {
//   render(<App />);
//   const dv = screen.getByTestId("test-div");
//   expect(dv).toBeInTheDocument();
// });

//get by text

// test("get by text ", async () => {
//   render(<App />);
//   const el = await screen.findByText("data found", {}, { timeout: 4000 });
//   expect(el).toBeInTheDocument();
// });

//  on chnage event testing
// test("on change event test", async () => {
//   userEvent.setup();
//   render(<App />);
//   const el = screen.getByRole("textbox");
//   await userEvent.type(el, "vrushabh");
//   expect(screen.getByText("vrushabh")).toBeInTheDocument();
// });

// props testing

// test("props testing", () => {
//   const name = "rohit";
//   render(<User name={name} />);
//   const user = screen.getByText(`${name} Hulle`);
//   expect(user).toBeInTheDocument();
// });

//functional props
// test("props testing", async () => {
//   const testFunction = jest.fn();
//   userEvent.setup(); //helps to identify click and onChange event of user
//   render(<App testFunction={testFunction} />);
//   const btn = screen.getByRole('button');
//   await userEvent.click(btn)
//   expect(testFunction).toHaveBeenCalled()
// });
