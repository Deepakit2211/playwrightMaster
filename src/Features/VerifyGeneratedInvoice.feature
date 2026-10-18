Feature: Place order and generate purchase invoice

Scenario: Verify the product added, and validate the entry on pdf invoice.
Given Launch URL and Navigate to the Login Page
When Enter username and password
Given User adds the products to cart and proceed to checkout.
When Enter the required checkout details
Then verify the content of downloaded file
