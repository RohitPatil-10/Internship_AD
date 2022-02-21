--Part I: Create user called northwind identified by root.

--Part II: Create tables as indicated in �Oracle_Northwind_CreateObjects.sql �.

--Part III: Add records as indicated in �Oracle_Northwind_InsertData.sql.sql�

--Part IV: Write queries on Northwind db.


--1. Get a list of latest order IDs for all customers by using the max function on Order_ID column
SELECT o.orderid,c.companyname
FROM orders o
INNER JOIN customers c
ON o.customerid=c.customerid
ORDER BY orderid DESC;


--2. Find suppliers who sell more than one product to Northwind Trader.
SELECT s.companyname,COUNT(p.productname)as TotalProducts
FROM suppliers s
INNER JOIN products p
ON s.supplierid=p.supplierid
HAVING count(p.productname)>1
GROUP BY s.companyname
ORDER BY s.companyname,TotalProducts;


--3. Create a function to get latest order date for entered customer_id
CREATE OR REPLACE FUNCTION get_latest_order_for_customer(c_id IN VARCHAR)
RETURN VARCHAR
IS o_date VARCHAR(20);    
CURSOR let_order_date IS
            SELECT orderdate FROM orders WHERE customerid = c_id ORDER BY orderdate DESC FETCH FIRST 1 ROWS ONLY;        
BEGIN
    OPEN let_order_date;
    FETCH let_order_date INTO o_date;
    RETURN o_date;
END;


DECLARE
  v_order_date VARCHAR2(20);
BEGIN
  v_order_date := get_latest_order_for_customer('ALFKI');
  dbms_output.put_line('Latest order date for ALFKI is ' || v_order_date);
END;


--4. Get the top 10 most expensive products.
SELECT productname as The_Most_Expensive_Products,unitprice
FROM products
ORDER BY unitprice DESC
FETCH NEXT 10 ROWS ONLY;


--5. Rank products by the number of units in stock in each product category
SELECT productname, categoryid,unitsinstock,RANK() OVER(PARTITION BY categoryid ORDER BY unitsinstock DESC) rank
FROM products;




--6. Rank customers by the total sales amount within each order date
SELECT c.customerid,o.orderid,o.orderdate,od.quantity
FROM customers c
INNER JOIN orders o
ON c.customerid=o.customerid
INNER JOIN orderdetails od
ON o.orderid=od.orderid
ORDER BY o.orderdate DESC;




--7. For each order, calculate a subtotal for each Order (identified by OrderID).
-- sum(UnitPrice * Quantity * (1 - Discount))
SELECT orderid,sum(unitprice*quantity*(1-discount)) as subtotal
FROM orderdetails
GROUP BY orderid
ORDER BY orderid;



--8. Sales by Year for each order. Hint: Get 
--Subtotal as sum(UnitPrice * Quantity * (1 - Discount)) for every order_id then join with orders 
--table
SELECT o.shippeddate,o.orderid, SUM(od.unitprice*od.quantity*(1-od.discount)) as subtotal,EXTRACT(Year FROM o.orderdate) as year
FROM orders o
INNER JOIN orderdetails od
ON o.orderid = od.orderid
GROUP BY o.orderid,o.shippeddate,EXTRACT(Year FROM o.orderdate)
ORDER BY o.shippeddate;



--9. Get Employee sales by country names
SELECT e.country, e.Lastname, e.Firstname,o.shippedDate,o.orderid,(od.unitprice * od.quantity) Sale_amount
FROM employees e JOIN orders o ON e.employeeid = o.employeeid, orderdetails od 
WHERE o.orderid = od.orderid 
ORDER BY lastname,o.orderid;


--10. Alphabetical list of products
SELECT productid,productname,supplierid,categoryid,quantityperunit,unitprice,discontinued
FROM products
WHERE discontinued<>1
ORDER BY productname;


--11. Display the current Productlist
SELECT productid,productname
FROM products
WHERE discontinued<>1
ORDER BY productname;


--12. Calculate sales price for each order after discount is applied.
    SELECT o.orderid,p.productid,p.productname,o.unitprice,o.quantity,o.discount,o.unitprice*o.quantity*(1-o.discount) as ExtendedPrice
    FROM products p
    INNER JOIN orderdetails o
    ON p.productid=o.productid
    ORDER BY orderid,p.productname DESC;


--13. Sales by Category: For each category, we get the list of products sold and the total sales amount.
SELECT c.categoryid,c.categoryname,productname,p.unitprice*p.unitsinstock as ProductSales
FROM categories c
INNER JOIN products p
ON c.categoryid=p.categoryid
WHERE p.discontinued<>1
ORDER BY c.categoryid,p.productname;






--14. Create below views:
--1].
CREATE VIEW vwProducts_Above_Average_Price AS
SELECT productname,unitprice
FROM products
WHERE unitprice > (SELECT AVG(unitprice) FROM Products)
ORDER BY unitprice;

SELECT * FROM vwProducts_Above_Average_Price;





--2].
CREATE VIEW  vwQuarterly_Orders_by_Product AS
SELECT p.productname,c.companyname,EXTRACT(year FROM o.orderdate)as orderdate
FROM products p
INNER JOIN orderdetails od
ON p.productid=od.productid
INNER JOIN orders o 
ON od.orderid=o.orderid 
INNER JOIN customers c 
ON o.customerid=c.customerid
ORDER BY p.productname;

SELECT * FROM vwQuarterly_Orders_by_Product;




--3].Display Supplier Continent wise sum of unitinstock.
CREATE VIEW  vwUnitsInStock
SELECT p.unitsinstock
FROM suppliers s
INNER JOIN products p
ON s.supplierid=p.supplierid

SELECT * FROM vwUnitsInStock;



--4].
--Display top 10 expensive products
CREATE VIEW vw10Most_Expensive_Products AS
SELECT productname,unitprice
FROM products
ORDER BY unitprice DESC
FETCH NEXT 5 ROW ONLY;

SELECT * FROM vw10Most_Expensive_Products;



--5].
--Display customer supplier by city
CREATE VIEW vwCustomer_Supplier_by_City AS
SELECT city, companyName, contactName, 
CASE  WHEN customers.customerid IN (SELECT customers.customerid FROM customers JOIN suppliers ON customers.contacttitle = suppliers.contacttitle) THEN 'supplier'
ELSE 'customer' 
END as Relationship
FROM customers
ORDER BY CITY;

SELECT * FROM vwCustomer_Supplier_by_City;
