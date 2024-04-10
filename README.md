# Convex hull Algorithm
 NUU CSIE Junior Algorithm Homework 1 in Home Teaching


## JS

### 程式碼

* 搭配網頁製作，將js寫在html裡面。
* 程式碼如上面的js的資料夾裡的`graphforjs.html`所示。

### 課堂練習1
* 現在有個問題，最高點計算凸包後都會消失，如此圖
![image](https://hackmd.io/_uploads/SJ6BYmzeA.png)
你的目標將會是，解決這個問題。

* 參考解法：
1. 在排序時，除了按照與起點的角度排序，如果角度相同（即點共線），則應該按照與起點的距離進行進一步排序。
2. 在構建凸包的循環中，當遇到共線的情況，你應該繼續彈出堆疊中與新點共線的點。

* 修改點應包括：
1. 極角相同的點按與起點的距離進行排序，最遠的點排在前面。
2. 在構建凸包的過程中，當新的點和堆疊頂端的兩點共線時，我們將繼續彈出堆疊頂部的點，直到發現一個有效的左轉為止。
    這樣可以保證所有共線點中最遠的點被包括在凸包中。
4. 堆疊初始只包含起點。


## C++

### 程式碼與配置說明
* 需要載這個`CImg.h` 會直接提供[連結](https://drive.google.com/file/d/1LTP767-24uYW1jHcaMNAvZa16BOZn0dg/view?usp=sharing)。


* 打開dev-C++，並開新專案

![image](https://hackmd.io/_uploads/SJCCQvflC.png)

![image](https://hackmd.io/_uploads/HJCCEDGe0.png)

* 將cpp的資料夾裡的`CImg.h` 加入到專案

```
# include "CImg.h"
```

* 點開cpp資料夾裡的`main.cpp`的程式碼並複製。
    

* 接著點進工具，編譯選項。
![image](https://hackmd.io/_uploads/Hk_PrPzxR.png)
打以下的指令
![image](https://hackmd.io/_uploads/rk4uSwGx0.png)

* 按下紅色圈圈內的編譯執行的按紐


![image](https://hackmd.io/_uploads/SJjsrwGgC.png)

### 課堂練習2
![image](https://hackmd.io/_uploads/HyPb8wzeC.png)

執行完後，你突然會發現雖然程式都沒問題，但似乎好像啥都沒有？
你的任務就是，去解決這個問題。
提示：平移跟放大。

最後應該要長這樣
![image](https://hackmd.io/_uploads/r1_pIwfgC.png)

## Python 

### 程式碼說明
如同`python`資料夾的程式碼所示。

### 課堂練習3
老師似乎是希望你們手刻，所以你現在的任務就是用PYTHON 手刻 Convex Hull的函式。


> 程式碼在4.6的課堂講義那邊，會順便說明一下4.6當時上的其實不是分治，而是貪婪算法。
