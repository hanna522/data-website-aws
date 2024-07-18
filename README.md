# Data Filtering/Sorting Website

The Data Filtering/Sorting Website allows users to sort, filter, and check the summary of data collected from 20 devices, including motion, temperature, and light. The data is collected every 10 minutes for 30 days.

## Website
You can check the website from the link below:
[Data Filtering/Sorting](https://main.d2u8n4ytc3u84v.amplifyapp.com)

## Preview
![Preview Image](![Picture1](https://github.com/user-attachments/assets/af521520-4e33-4f9c-916b-7dc6a5f7a6d8)
)
  1. **Filter**: Set filter(s) to get filtered data.
  2. **Summary Data**: Check summary for the filtered data.
  3. **Data**: Check the data by pages.
    - **Sort**: Sort the data by clicking the top row of columns 'device_id', 'timestamp', 'temperature', 'light', 'motion'.
    - **Navigate**: Navigate to the next page using the arrow button on the top of the dataset or the number buttons on the bottom of the dataset.

## Tech Stacks

### Languages
- **Python**: Used for backend, including Lambda functions.
- **React**: Used for frontend development.

### AWS Services
- **Lambda**: For writing Lambda functions.
  1. **Fetching Data Function**: Fetches data by page.
  2. **Filtering Data Function**: Fetches filtered data by page.
  3. **Sorting Data Function**: Fetches sorted data by page.
  4. **Filtering and Sorting Data Function**: Fetches filtered and sorted data by page.
  5. **Fetching Summary Function**: Fetches a summary of the total data.
- **RDS**: Used to store data.
- **S3**: For storing static assets.
- **Amplify**: For deployment.
- **API Gateway**: To connect backend services with the frontend.
