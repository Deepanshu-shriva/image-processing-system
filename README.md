Objective
Build a system to efficiently process image data from CSV files, validate the data, asynchronously compress images, store the results in a database, and provide a mechanism to track processing status.

System Overview
The system will accept a CSV file containing product data, process the images referenced in the CSV, and return the processed image URLs. It will include APIs for uploading the CSV and checking the status of the processing.

Requirements
Functional Requirements
Upload API: Accept a CSV file, validate its format, and return a unique request ID.
Status API: Allow users to query processing status using the request ID.
Image Processing: Compress images asynchronously.
Webhook: Trigger a webhook after processing is complete.
Non-Functional Requirements
Performance: The system should handle multiple CSV uploads concurrently.
Scalability: The architecture should support scaling as needed.
Security: Ensure secure handling of uploaded files.
Low-Level Design
Architecture Diagram
Include a visual diagram created using tools like Draw.io to represent the overall architecture of the system.

Components Description
Image Processing Service: Handles image compression and processing.
Webhook Handling: Manages callbacks from the image processing service.
Database Interaction: Stores product data and tracks the status of processing requests.
API Endpoints:
Upload API: For accepting CSV files.
Status API: For checking processing status.
Database Schema
plaintext
Copy code
Table: Products
- id: ObjectId (Primary Key)
- serialNumber: Number
- productName: String
- inputImageUrls: [String]
- outputImageUrls: [String]
- requestId: String
- status: String
- createdAt: Date
- updatedAt: Date
API Documentation
Upload API
Endpoint: POST /api/upload
Request:
Body: Multipart/form-data containing the CSV file.
Response:
200 OK: { "requestId": "unique-request-id" }
400 Bad Request: { "message": "Invalid CSV format" }
Status API
Endpoint: GET /api/status/:requestId
Response:
200 OK: { "status": "completed", "outputImageUrls": [...] }
404 Not Found: { "message": "Request ID not found" }
Asynchronous Workers Documentation
Provide descriptions of worker functions that process images, handle database updates, and manage the lifecycle of requests.

Testing
Document the testing strategy, including unit tests, integration tests, and how to run them.

GitHub Repository
Link to the GitHub repository containing the project code: https://github.com/Deepanshu-shriva/image-processing-system.git
