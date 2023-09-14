# CoffeeReviews
A Personal project intended on creating a fullstack blog site for reviewing various coffee beans I come across

# Hosting
This project is hosted on several aws ec2 instances and can be accessed here: 

# Installation:
## Dependencies: 
This project primarily uses npm to manage dependencies
- ReactJS
  - rechart: (for rating graphs)
  - axios: (simple HTTP requests)
  - fontawesome
- ExpressJS
  - dotenv
  - passportjs
  - jsonwebtoken
- MySQL (if you intend to create your own database to attach or test with)

## Clone: 
run: `git clone https://github.com/InspectorSpuds/CoffeeReviews.git` if you wish to download htis project locally

# Run:  
  To test functionality locally, just run `npm start` in the frontend, and `node index.js` in the backend

# Functionality:
  This project supports features such as:
  - Secure user login (to allow several chosen users to create posts)
  - Post creation and deletion
  - Graph/display tools: to display coffee taste profiles in a more standard and visual fashion as opposed to 
    word of mouth
