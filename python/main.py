import matplotlib.pyplot as plt
from scipy.spatial import ConvexHull
import numpy as np

# Use the previously generated points
points = [(1, 1), (5, 2), (5, 4), (2, 8), (3, 4), (3, 3), (0, 8), (1, 8),
          (8, 9), (4, 3), (4, 1), (8, 0), (7, 7), (3, 5), (1, 9), (2, 7),
          (3, 4), (8, 7), (4, 7), (6, 0)]

# Convert the list of tuples to a numpy array
points = np.array(points)

# Calculate the Convex Hull of the points
hull = ConvexHull(points)

# Plot the points
plt.plot(points[:, 0], points[:, 1], 'o')

# Plot the convex hull
for simplex in hull.simplices:
    plt.plot(points[simplex, 0], points[simplex, 1], 'k-')

# Also plot the first and last points to close the hull
plt.plot(points[hull.vertices[0], 0], points[hull.vertices[0], 1], 'ro')
plt.plot(points[hull.vertices[-1], 0], points[hull.vertices[-1], 1], 'ro')

# Show the plot
plt.show()