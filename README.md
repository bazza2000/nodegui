# Authentication Demo App

Built in React JS1

Install: `npm install`

Jest tests: `npm test`

Dev server:
    Build For Login Application  :  `npm run start`


Production Build: `npm run build`

Node Version: v8.11.1

Environment Variables

    authnUrl = "http://test02.test.co-test.cloud"
    authnPort = ":9099"

# CSS Linter (SASS-LINT)
## property-sort-order:
  order:  
    - position  
    - top  
    - right  
    - bottom  
    - left 
    - display  
    - width
    - height  
    - margin  
    - padding  
    
Max-nesting: 3  
Variables required on CSS colors: color, background-color  
NO !importants  
NO #id except React DOM  

## Use BEM

    .my-component {

        .my-component__list-item {

        }

        .my-component__list-item--modifier {
        
        }
  
    }

# JS Linter (ES-LINT)
JavaScript linter with React is installed (ES-LINT).  
Fix all linting errors and warnings locally before committing. The console will display how to fix the errors. Any issues ask Harry Jacks.

## JS Methods

Use ES6 syntax. Babel is being used to compile back.  
  
Use camel case for method names.  
  
Follow this format for methods with a single parameter:

    YOUR-METHOD-NAME: param => {};  
  
Follow this format for methods with multiple parameters:  

    YOUR-METHOD-NAME: (param1, param2) => {};
    
## React / Redux  
Use the connect function from 'react-redux' for any 'smart' components (i.e a component that needs state and access to the redux store) and use a standard mapStateToProps function to access props accross components.
Use 'dumb' components if no state or redux is needed.
  
# Unit Tests
Jest and Enzyme are being used for Unit tests. Each component needs a unit test adding and any utility function that returns a value.
  
## components
Test the following:  
- component renders
- props  
- state/store
- mock and simulate events  
- re-check any state changes after events  
  
## Functions  
Test the following:  
- Check any functions that return a response

