import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import NavChart from "@/components/nav-chart";
import type { Transaction, NgoProject } from "@shared/schema";

export default function Dashboard() {
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: ngoProjects, isLoading: projectsLoading } = useQuery<NgoProject[]>({
    queryKey: ["/api/ngo-projects"],
  });

  // Calculate portfolio values
  const investmentTransactions = transactions?.filter(t => t.type === 'investment') || [];
  const totalInvestment = investmentTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const currentValue = totalInvestment * 1.074; // 7.4% gain
  const gainAmount = currentValue - totalInvestment;
  const gainPercent = totalInvestment > 0 ? (gainAmount / totalInvestment) * 100 : 0;

  return (
    <div className="screen-content">
      {/* Portfolio Overview */}
      <div className="bg-gradient-to-r from-olive to-charcoal mx-4 mt-4 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Portfolio Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sand opacity-80 text-sm">Total Investment</p>
            <p className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sand opacity-80 text-sm">Current Value</p>
            <p className="text-2xl font-bold text-green-300">₹{Math.round(currentValue).toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <i className="fas fa-arrow-up text-green-300"></i>
          <span className="text-green-300 font-medium">
            +{gainPercent.toFixed(2)}% (₹{Math.round(gainAmount).toLocaleString()})
          </span>
          <span className="text-sand opacity-80 text-sm">This month</span>
        </div>
      </div>

      {/* NAV Chart */}
      <NavChart />

      {/* Recent Transactions */}
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {transactions?.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'investment' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <i className={`${
                        transaction.type === 'investment' 
                          ? 'fas fa-plus text-green-600' 
                          : 'fas fa-hand-holding-heart text-blue-600'
                      }`}></i>
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type === 'investment' ? 'Investment' : 'Zakat Donation'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(transaction.createdAt!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{transaction.amount}</p>
                    <p className="text-gray-500 text-sm">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Zakat & Charity Section */}
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Zakat & Charity</CardTitle>
          <i className="fas fa-hand-holding-heart text-blue-600"></i>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-4">Support verified NGOs and causes</p>
          
          {projectsLoading ? (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {ngoProjects?.map((project) => {
                const fundedPercent = (parseFloat(project.raisedAmount) / parseFloat(project.targetAmount)) * 100;
                return (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{project.name}</h5>
                      <span className={`text-sm ${
                        fundedPercent >= 60 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {Math.round(fundedPercent)}% funded
                      </span>
                    </div>
                    <Progress value={fundedPercent} className="mb-3" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      Donate Now
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
