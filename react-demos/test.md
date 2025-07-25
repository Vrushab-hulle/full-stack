# Types of testing
1. unit testing (mostly we do this)
2. integartion testing (rarely tested by developer for frontend)
3. end to end application test

# Basic step in testing
1. Render Component
2. Find Element and action
3. Assertions

# test('function defination','callback','timeout(optional)')
# test and expect is part of jest
# render and screen is part of rtl

# Start watch mode: npm run test:watch
Press 'f' to run only failing tests
Press 'p' to filter by filename
Press 'a' to run all tests
Press 'q' to quit

# What is describe
>> to group related multiple test cases together
 1. how to make test cases group
 2. run test case with describe
 3. skip in describe
    >> describe.skip
 4. only in describe
    >> describe.only

# Test on Change Event with input box
1. Make input box in the component
2. Define state and use with on change event
3. import component in test file
4. write code for test case
5. run test case

# Test Click Event with Button
1. Make Button and state in the component
2. update state with button click event
3. import component in test file
4. write code for test click event
5. run test case

# File naming convention
1. What file Name we can use for test case file
2. Folder name for testing files
3. run test case with naming convention
fileName.test.js
fileName.spec.js
fileName.spec.jsx
__test__

# Before and After hooks
1. use of before and after hook
2. beforeAll and beforeEach
3. AfterAll and afterEach
Example

# snap shot testing
    it just keep the photocopy of our component to check if there is any change when we run our test case before pushing it to production for bettwe understanding we can take example of git how git show updated code in the git logs it works same as that
1. what is snapshot testing
2. example
3. when this is useful
4. how to update snapshots

# important points for testing
1. What we should test
    >> testing component rendering
    >> ui elemnts that we write
    >> function which we write
    >> api testing
    >> event testing
    >> props and states
    >> ui condition testing / ui state testing

2. what things we should not test
    >> External ui library code
    >> no need to test default function of js and react
    >> sometime we should mock function rather tahn testing it in details

3. important points
    >> do not write snapshots in starting of the project
    >> run test case after completing ypur functinality
    >> make a standard for code coverage

# class component method testing

# functional compoennt method testing
1. discuss possible case for method testing
2. define the button click event and method
3. test method with event
4. test method without event

# RTL Query (React testing libarary queries)
1. What is rtl query
 >> we can use to find ui elements 
2. why need rtl query
3. steps in testing ui
4. how rtl query finds elements
    >> By Element
    >> By Elment Name
    >> By Element id
    >> By Test id

5. type of rtl queries
    >> Find Single Element
        1. getBy
        2. queryBy
        3. findBy
    >> Find Multiple elements
        1. getAllBy
        2. queryAllBy
        3. findAllBy

# getByRole Query
    >> we have some semantic tags which have some role in ui. button, heading

# Multiple Element with Role
1. multiple elements with the same role issue
2. multiple buttons with role
3. multiple input box with role
4. custom role

# basic rtl queries methods
1. getByRole
2. getAllByRole
3. getByLabelText
4. getByTestId
5. getByDisplayValue
>> there are more methods we can visit official doc for better understanding 

# priority order for rtl queries
//  PREFER THESE (Accessible to everyone)
getByRole()           // #1 - Most preferred
getByLabelText()      // #2
getByPlaceholderText() // #3
getByText()           // #4
getByDisplayValue()   // #5

//  OK TO USE (Semantic queries)
getByAltText()        // #6
getByTitle()          // #7

//  AVOID IF POSSIBLE (Not accessible)
getByTestId()         // #8 - Last resort

# Assertion method
1. jest-dom Matchers (Most Common for UI Testing)
>> Element exists in DOM
expect(element).toBeInTheDocument()

>> Element is visible to user
expect(element).toBeVisible()

>> Element exists but may not be visible
expect(element).toBeTruthy()

>> Element doesn't exist
expect(element).not.toBeInTheDocument()

>> Element exists in DOM
expect(element).toBeInTheDocument()

>> Element is visible to user
expect(element).toBeVisible()

>> Element exists but may not be visible
expect(element).toBeTruthy()

>> Element doesn't exist
expect(element).not.toBeInTheDocument()

Content Assertions
>> Text content
>> (i) is for case insensitive
expect(element).toHaveTextContent('Hello World')
expect(element).toHaveTextContent(/hello/i) 

>> Exact text match
expect(element).toHaveTextContent('Hello World', { exact: true })

>> HTML content
expect(element).toContainHTML('<span>Hello</span>')

Form Elements

>> Input values
expect(input).toHaveValue('john@example.com')
expect(input).toHaveDisplayValue('John Doe')

>> Checkboxes/Radio buttons
expect(checkbox).toBeChecked()
expect(checkbox).not.toBeChecked()

>> Form validation
expect(input).toBeValid()
expect(input).toBeInvalid()
expect(input).toHaveErrorMessage('Required field')

>> Required fields
expect(input).toBeRequired()

>> Disabled state
expect(button).toBeDisabled()
expect(button).toBeEnabled()

Attributes & Properties

>> Generic attributes
expect(element).toHaveAttribute('data-testid', 'submit-btn')
expect(element).toHaveAttribute('aria-label')

>> CSS classes
expect(element).toHaveClass('btn btn-primary')
expect(element).toHaveClass('active', 'highlighted') // multiple classes

>> Styles
expect(element).toHaveStyle('color: red')
expect(element).toHaveStyle({ color: 'red', fontSize: '16px' })

>> Accessibility
expect(element).toHaveAccessibleName('Submit form')
expect(element).toHaveAccessibleDescription('Click to submit')

# textmatch with function

const dv = screen.getByText((content,element)=>content.startsWith('Hello'))
expect(sv).toBeInTheDocument()

# findBy and findAllBy

# test element with js query
1. getElementById
2. getElementByClassName

# on change event testing / keyboard interactions

# Test Component props
1. Make Component
2. pass props and display on ui
3. write test case to test props

# Functional props testing and function mocking

# Debbuging
1. automatic debugging
    >> whatever we see in console after running test that falls under automatic debugging
2. prettyDOM
3. debug

# Testing playground on chrome (extension not avaialable)

# MSW (need to go through documentation)
>>mostly we test rest api by mocking
>>MSW stands for Mock Service Worker
>>React testing library recommend to use MSW
>>we can mock api with jest also























# act function