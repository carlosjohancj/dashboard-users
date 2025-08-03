import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useAppStore } from '@/store/app-store'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300']

export function ExpenseChart() {
  const { expenses } = useAppStore()

  const categoryData = useMemo(() => {
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categories).map(([category, amount]) => ({
      name: category === 'content' ? 'Contenido' : 
            category === 'subscription' ? 'Suscripciones' :
            category === 'tip' ? 'Propinas' : 'Otros',
      value: amount
    }))
  }, [expenses])

  const monthlyData = useMemo(() => {
    const months = expenses.reduce((acc, expense) => {
      const month = expense.date.toLocaleDateString('es-ES', { month: 'short' })
      acc[month] = (acc[month] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(months).map(([month, amount]) => ({
      month,
      amount
    }))
  }, [expenses])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Gastos por Categoría</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, 'Monto']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Gastos Mensuales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Monto']} />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}