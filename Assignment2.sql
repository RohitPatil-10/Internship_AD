--1. Display all the information of the EMP table?
SELECT empno,ename,job,mgr,hiredate,sal,comm,deptno,branchno FROM emp;

--2. Display unique Jobs from EMP table?
SELECT DISTINCT job
FROM emp;

--3. List the emps in the asc order of their Salaries?
SELECT ename,sal
FROM emp
ORDER BY sal ASC;

--4. List the details of the emps in asc order of the Dptnos and desc of Jobs?
SELECT empno,ename,job,mgr,hiredate,sal,comm,deptno,branchno
FROM emp
ORDER BY deptno ASC, job DESC;

--5. Display all the unique job groups in the descending order?
SELECT DISTINCT job
from emp
ORDER BY job DESC;

--6. Display all the details of all ‘Mgrs’
SELECT mgr,empno,ename,job,hiredate,sal,comm,deptno,branchno
FROM emp
WHERE mgr IS NOT NULL
ORDER BY mgr;

--7. List the emps who joined before 1981
SELECT ename,hiredate
FROM emp
WHERE HIREDATE < '01/01/1981';

--8. List the Empno, Ename, Sal, Daily sal of all emps in the asc order of Annsal
SELECT empno,ename,sal,ROUND(sal/30) as Daily_Salary,sal*12 as Annual_Salary
FROM emp
ORDER BY Annual_Salary;

--9. Display the Empno, Ename, job, Hiredate, Exp of all Mgrs
SELECT empno,ename,job,hiredate,(EXTRACT(YEAR FROM CURRENT_DATE)-EXTRACT(YEAR FROM hiredate)) as Exp
FROM emp;

--10. List the Empno, Ename, Sal, Exp of all emps working for Mgr 7369
SELECT empno,ename,sal,(EXTRACT(YEAR FROM CURRENT_DATE)-EXTRACT(YEAR FROM hiredate)) as Exp
FROM emp
WHERE mgr=7369;

--11. Display all the details of the emps whose Comm  Is more than their Sal
SELECT empno,ename,job,mgr,hiredate,sal,comm,deptno,branchno
FROM emp
WHERE sal<comm;

--13. List the emps along with their Exp and Daily Sal is more than Rs 100
SELECT ename,(EXTRACT(YEAR FROM CURRENT_DATE)-EXTRACT(YEAR FROM hiredate)) as Exp
FROM emp
WHERE sal>100
ORDER BY Exp;

--14. List the emps who are either ‘CLERK’ or ‘ANALYST’ in the Desc order
SELECT ename,job
FROM emp
WHERE job='CLERK' OR job='ANALYST';

--15. List the emps who joined on 1-MAY-81,3-DEC-81,17-DEC-81,19-JAN-80 in asc order of seniority
SELECT ename,hiredate
FROM emp
WHERE hiredate IN ('01/05/1981','17/10/1981','19/01/1980');

--16. List the emp who are working for the Deptno 10 or 20   
SELECT ename,deptno
FROM emp
WHERE deptno IN (10,20)
ORDER BY deptno;

--17.List the emps who are joined in the year 81
SELECT ename,hiredate
FROM emp
WHERE EXTRACT(YEAR FROM hiredate)=1981;

--19. List the emps Who Annual sal ranging from 22000 and 45000
SELECT ename,job,sal*12 AS Annual_Sal
FROM emp
WHERE sal*12 BETWEEN 22000 AND 45000;

--20. List the Enames those are having five characters in their Names
SELECT ename
FROM emp
WHERE ename LIKE '_____';

--21. List the Enames those are starting with ‘S’ and with five characters
SELECT ename
FROM emp
WHERE ename LIKE 'S%';

--22. List the emps those are having four chars and third character must be ‘r’
SELECT ename,job,sal
FROM emp
WHERE ename LIKE '__R_';


--23. List the Five character names starting with ‘S’ and ending with ‘H’
SELECT ename,job,sal
FROM emp
WHERE ename LIKE 'S%' AND ename LIKE '%H';

--24.List the emps who joined in January
SELECT ename,hiredate,sal
FROM emp
WHERE EXTRACT(MONTH FROM hiredate)=01;

--27. List the emps whose names having a character set ‘ll’ together
SELECT ename,job,sal
FROM emp
WHERE ename LIKE '%LL%';

--29. List the emps who does not belong to Deptno 20
SELECT ename,deptno
FROM emp
WHERE deptno <> 20;

--30. List all the emps except ‘PRESIDENT’ & ‘MGR” in asc order of Salaries
SELECT ename,sal,job
FROM emp
WHERE job NOT IN ('PRESIDENT','MANAGER') 
ORDER BY sal;

--31. List the emps whose Empno not starting with digit78
SELECT empno,ename
FROM emp
WHERE empno LIKE '78%';

--33. List the emps who are working under ‘MGR’

SELECT 
    ename,empno,job,sal,deptno
FROM
    emp
WHERE
    job IN 'MANAGER';

--34. List the emps who joined in any year but not belongs to the month of March
SELECT ename,hiredate
FROM emp
WHERE EXTRACT(MONTH FROM hiredate)<>03;

--35. List all the Clerks of Deptno 20
SELECT ename,job,deptno
FROM emp
WHERE job='CLERK' AND deptno=20;

--36. List the emps of Deptno 30 or 10 joined in the year 1981
SELECT ename,hiredate,deptno
FROM emp
WHERE deptno IN(30,10) AND EXTRACT(YEAR FROM hiredate)=1981
ORDER BY ename;

--37. Display the details of SMITH
SELECT empno,ename,job,mgr,hiredate,sal,comm,deptno,branchno
FROM emp
WHERE ename='SMITH';

--38. Display the location of SMITH
SELECT 
    ename,location
FROM
    emp JOIN dept
ON
    emp.deptno=dept.deptno 
JOIN
    branch
ON 
    dept.branchno=branch.branchno
WHERE
    ename IN 'SMITH';