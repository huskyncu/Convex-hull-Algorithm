#include "CImg.h"
#include <vector>
#include <algorithm>
#include <iostream>

using namespace cimg_library;
using namespace std;

struct Point {
    int x, y;
};

bool compareY(Point p1, Point p2) {
    return p1.y < p2.y || (p1.y == p2.y && p1.x < p2.x);
}

int distSq(const Point& p1, const Point& p2) {
    return (p1.x - p2.x) * (p1.x - p2.x) +
           (p1.y - p2.y) * (p1.y - p2.y);
}

int orientation(const Point& p, const Point& q, const Point& r) {
    int val = (q.y - p.y) * (r.x - q.x) -
              (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // colinear
    return (val > 0) ? 1 : 2; // clock or counterclock wise
}

bool compare(const Point& p0, const Point& p1, const Point& p2) {
    int o = orientation(p0, p1, p2);
    if (o == 0)
        return distSq(p0, p2) >= distSq(p0, p1);
    return o == 2;
}

// 凸包主算法
vector<Point> convexHull(Point points[], int n) {
    // 尋找最左下的點
    int minY = points[0].y, min = 0;
    for (int i = 1; i < n; i++) {
        int y = points[i].y;
        if ((y < minY) || (minY == y && points[i].x < points[min].x))
            minY = points[i].y, min = i;
    }
    
    // 將這個點放到 points[0]
    swap(points[0], points[min]);
    
    // 對點按照與 points[0] 的極角排序
    Point p0 = points[0];
    sort(points + 1, points + n, [p0](const Point& a, const Point& b) {
        return compare(p0, a, b);
    });
    
    // 構建凸包
    vector<Point> hull;
    
    // 把前三個點加入凸包
    for (int i = 0; i < 3; i++)
        hull.push_back(points[i]);
    
    // 處理剩餘的點
    for (int i = 3; i < n; i++) {
        // 維持凸包的性質
        while (orientation(hull[hull.size() - 2], hull.back(), points[i]) != 2)
            hull.pop_back();
        hull.push_back(points[i]);
    }
    
    return hull;
}

int main() {
	Point points[] = {
	    {1, 1}, {5, 2}, {5, 4}, {2, 8}, {3, 4}, {3, 3}, {0, 8}, {1, 8},
	    {8, 9}, {4, 3}, {4, 1}, {8, 0}, {7, 7}, {3, 5}, {1, 9}, {2, 7},
	    {3, 4}, {8, 7}, {4, 7}, {6, 0}
	};
    int n = sizeof(points) / sizeof(points[0]);
    vector<Point> hull = convexHull(points, n);
    
    // Use CImg to draw points and convex hull
    CImg<unsigned char> img(600, 600, 1, 3, 0);
    const unsigned char red[] = { 255, 0, 0 };
    const unsigned char green[] = { 0, 255, 0 };
    
    int scaleFactor = 50;

	// Draw all points
	for(int i = 0; i < n; i++) {
	    img.draw_circle(points[i].x * scaleFactor+scaleFactor, points[i].y * scaleFactor+scaleFactor, 3, red);
	}
	
	// Draw the convex hull
	for(size_t i = 0; i < hull.size(); i++) {
	    int next = (i + 1) % hull.size();
	    img.draw_line(hull[i].x * scaleFactor+scaleFactor, hull[i].y * scaleFactor+scaleFactor, 
	                  hull[next].x * scaleFactor+scaleFactor, hull[next].y * scaleFactor+scaleFactor, green);
	}
    
    img.display("Convex Hull");
    return 0;
}

