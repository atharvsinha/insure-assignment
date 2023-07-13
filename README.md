# Sales Data Analysis

This code performs analysis on sales data to calculate various metrics such as total sales, monthly sales, popular items by month, profitable items by month, and more.

## Code

The code reads sales data from a file, processes it, and calculates the required metrics. Here are the main components of the code:

- Importing necessary modules and defining type declarations and interfaces.
- Reading the sales data from a file.
- Initializing variables for storing data and metrics.
- Main logic for computing the required results.
- Printing the results to the console.

## Output

The code produces the following output:

1. Total sales: 4583270
2. Monthly sales: {'01': 1421330, '02': 1422350, '03': 1739590}
3. Most popular items by month (quantity):
   - January: Hot Chocolate Fudge (2673)
   - February: Hot Chocolate Fudge (2636)
   - March: Hot Chocolate Fudge (3100)
4. Most revenue by item by month:
   - January: Hot Chocolate Fudge (320760)
   - February: Hot Chocolate Fudge (316320)
   - March: Hot Chocolate Fudge (372000)
5. Most popular item: Hot Chocolate Fudge (8409)
   - Minimum order by month for most popular item: {'01': 1, '02': 1, '03': 1}
   - Maximum order by month for most popular item: {'01': 5, '02': 5, '03': 5}
   - Average order by month for most popular item:
     - January: 3.0306122448979593
     - February: 3.0975323149236194
     - March: 2.9551954242135365

## Usage

To use this code, follow these steps:

1. Install Node.js if you don't have it already.
2. Install `ts-node` globally by running the following command in your terminal:
   ```
   npm install -g ts-node
   ```
3. Prepare a file named `sales.txt` containing the sales data.
4. Open a terminal and navigate to the directory where the code and `sales.txt` file are located.
5. Run the code using the following command:
   ```
   ts-node your-code-filename.ts
   ```
   Replace `your-code-filename.ts` with the actual filename of your code file.
6. View the output in the console.

Please make sure to replace `your-code-filename.ts` with the actual filename of your code file.
