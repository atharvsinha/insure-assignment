// imports
import { readFileSync } from "fs";

// type declarations
interface DataType {
  Date: string[];
  SKU: string[];
  "Unit Price": number[];
  Quantity: number[];
  "Total Price": number[];
}
interface MostPopularItemByMonth {
  [month: string]: {
    sku: string;
    qty: number;
  };
}
interface MostProfitableItemByMonth {
  [month: string]: {
    sku: string;
    revenue: number;
  };
}
type Records = Record<string, number>;

// variable declarations
const lines: string[] = readFileSync("sales.txt", "utf-8").split("\n");
const data: DataType = {
  Date: [],
  SKU: [],
  "Unit Price": [],
  Quantity: [],
  "Total Price": [],
};
let minOrd: Records = {
  "01": 0,
  "02": 0,
  "03": 0,
};
let maxOrd: Records = {
  "01": 0,
  "02": 0,
  "03": 0,
};
let counter: Records = {
  "01": 0,
  "02": 0,
  "03": 0,
};
const monthlySales: Records = { "01": 0, "02": 0, "03": 0 };
const quantityBySku: Record<string, Records> = {};
const popularByMonth: MostPopularItemByMonth = {};
const profitableByMonth: MostProfitableItemByMonth = {};
let mostPopularItem: { sku: string; qty: number } = { sku: "", qty: 0 };
let totalSales: number = 0;

// main logic for computing the required results

// logic for questions 1 to 4
for (const line of lines.slice(1, lines.length - 1)) {
  // parsing every line from the txt file to variables
  const [date, sku, unitPrice, quantity, totalPrice] = line.split(",");

  // creating months and total sales variables
  const month: string = date.split("-")[1];
  const total: number = Number(totalPrice);

  // pushing the variables into data object
  data.Date.push(date);
  data.SKU.push(sku);
  data["Unit Price"].push(Number(unitPrice));
  data.Quantity.push(Number(quantity));
  data["Total Price"].push(Number(totalPrice));

  // calculating monthly sales
  monthlySales[month] = (monthlySales[month] || 0) + total;

  // calculating quantity by SKU and month
  if (!quantityBySku[sku]) {
    quantityBySku[sku] = {};
  }
  quantityBySku[sku][`${month}-qty`] =
    (quantityBySku[sku][`${month}-qty`] || 0) + Number(quantity);
  quantityBySku[sku][`${month}-Revenue`] =
    (quantityBySku[sku][`${month}-Revenue`] || 0) + total;

  // update popularByMonth object
  if (
    !popularByMonth[month] ||
    quantityBySku[sku][`${month}-qty`] > popularByMonth[month].qty
  ) {
    popularByMonth[month] = { sku, qty: quantityBySku[sku][`${month}-qty`] };
  }

  //update profitableByMonth object
  if (
    !profitableByMonth[month] ||
    quantityBySku[sku][`${month}-Revenue`] > profitableByMonth[month].revenue
  ) {
    profitableByMonth[month] = {
      sku,
      revenue: quantityBySku[sku][`${month}-Revenue`],
    };
  }

  // update most popular item
  if (quantityBySku[sku].quantity) {
    quantityBySku[sku].quantity += Number(quantity);
  } else {
    quantityBySku[sku].quantity = Number(quantity);
  }
  if (quantityBySku[sku].quantity > mostPopularItem.qty) {
    mostPopularItem = { sku, qty: quantityBySku[sku].quantity };
  }

  // update totalSales
  totalSales += total;
}

// logic for question 5
for (const line of lines.slice(1, lines.length - 1)) {
  if (line.includes(mostPopularItem.sku)) {
    // parse variables
    const [date, sku, unitPrice, quantity, totalPrice] = line.split(",");

    // get the month variables
    const month: string = date.split("-")[1];
    const currentQuantity: number = Number(quantity);
    // update counter for avg order by month
    counter[month] += 1;

    // calculating min quantity
    if (currentQuantity < minOrd[month] || minOrd[month] === 0) {
      minOrd[month] = currentQuantity;
    }

    // calculating max quantity
    if (currentQuantity > maxOrd[month]) {
      maxOrd[month] = currentQuantity;
    }
  }
}

console.log("1. total sales:", totalSales);
console.log("2. monthly sales:", monthlySales);
console.log("3. most popular items by month (quantity):", popularByMonth);
console.log("4. most revenue by item by month:", profitableByMonth);
console.log("5. most popular item:", mostPopularItem);
console.log("minimum order by month for most popular item:", minOrd);
console.log("maximum order by month for most popular item:", maxOrd);
// calculating avg order qty for each month
console.log("avg order by month for most popular item:", {
  "01": popularByMonth["01"].qty / counter["01"],
  "02": popularByMonth["02"].qty / counter["02"],
  "03": popularByMonth["03"].qty / counter["03"],
});
