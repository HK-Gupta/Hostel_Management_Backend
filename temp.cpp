// Online C++ compiler to run C++ program online
#include <iostream>
#include <vector>
#include <algorithm>
#include <limits>

using namespace std;
struct Cell {
    int r, c, cost;
};

bool comparator(Cell a, Cell b) {
    return a.cost < b.cost;
}

void minimumCost(vector<vector<int>>& cost, vector<int>& supply, vector<int>& demand) {

int main() {
    
    vector<vector<int>> cost = {
        {5, 6, 8},
        {4, 4, 6},
        {6, 7, 8}
    };
    
    vector<int> supply = {70, 30, 50};
    vector<int> demand = {65, 42, 43};
    
    minimumCost(cost, supply, demand);
    
    return 0;
}


    
    int n = demand.size();
    int m = supply.size();
    
    vector<vector<int>> allocations(m, vector<int>(n, 0));
    vector<Cell> cells;
    
    
    for(int i=0; i<m; i++) {
        for(int j=0; j<n; j++) {
            cells.push_back({i, j, cost[i][j]});   
        }
    }
    
    sort(cells.begin(), cells.end(), comparator);
    
    for(auto it: cells) {
        int i = it.r;
        int j = it.c;
        if(supply[i]==0 || demand[j]==0)
            continue;
            
        int x = min(supply[i], demand[j]);
        allocations[i][j] = x;
        supply[i] -= x;
        demand[j] -= x;
        
    }
    
    int totalCost  = 0;
    
    for(int i=0; i<m; i++) {
        for(int j=0; j<n; j++) {
            totalCost += allocations[i][j] * cost[i][j];
        }
    }
    
    cout<<"Total Cost: "<< totalCost;
}