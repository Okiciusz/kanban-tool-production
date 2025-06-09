# kanban-tool-production
MP tool
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { saveAs } from 'file-saver';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function KanbanApp() {
  const [columns, setColumns] = useState([
    { id: 1, title: 'Do zrobienia', tasks: [] },
    { id: 2, title: 'W trakcie', tasks: [] },
    { id: 3, title: 'Zrobione', tasks: [] },
  ]);

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('Wszystkie');

  const addTask = (columnId) => {
    if (!newTask.trim()) return;
    const enrichedTask = {
      name: newTask,
      employee: '',
      role: '',
      shift: '',
      okQty: 0,
      nokQty: 0,
      notes: '',
      deadline: ''
    };
    setColumns(columns.map(col =>
      col.id === columnId ? { ...col, tasks: [...col.tasks, enrichedTask] } : col
    ));
    setNewTask('');
  };

  const removeTask = (columnId, taskIndex) => {
    setColumns(columns.map(col =>
      col.id === columnId ? {
        ...col,
        tasks: col.tasks.filter((_, i) => i !== taskIndex)
      } : col
    ));
  };

  const exportTasks = () => {
    const allTasks = columns.flatMap(col => col.tasks.map(task => ({ ...task, column: col.title })));
    const csv = [
      ["Zadanie", "Pracownik", "Stanowisko", "Zmiana", "OK", "NOK", "Uwagi", "Termin", "Kolumna"],
      ...allTasks.map(t => [t.name, t.employee, t.role, t.shift, t.okQty, t.nokQty, t.notes, t.deadline, t.column])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'kanban_export.csv');
  };

  const allTasks = columns.flatMap(col => col.tasks);
  const today = new Date();

  const deadlineSummary = allTasks.map((task, index) => {
    const deadline = task.deadline ? parseISO(task.deadline) : null;
    const daysLeft = deadline ? differenceInCalendarDays(deadline, today) : null;

    return {
      name: task.name || `Zadanie ${index + 1}`,
      deadline: task.deadline || 'Brak terminu',
      daysLeft,
      status: daysLeft === null ? 'Brak terminu'
            : daysLeft < 0 ? 'Po terminie'
            : daysLeft === 0 ? 'Dzisiaj'
            : `${daysLeft} dni`
    };
  });

  const filteredSummary = deadlineSummary.filter(row => {
    if (filterStatus === 'Wszystkie') return true;
    if (filterStatus === 'Po terminie') return row.daysLeft < 0;
    if (filterStatus === 'Dzisiaj') return row.daysLeft === 0;
    if (filterStatus === 'W terminie') return row.daysLeft > 0;
    return true;
  });

  const chartData = allTasks.map((task, index) => ({
    name: task.name || `Zadanie ${index + 1}`,
    OK: Number(task.okQty || 0),
    NOK: Number(task.nokQty || 0)
  }));

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filtruj po nazwie zadania lub pracowniku"
        />
        <Button onClick={exportTasks}>Eksportuj do CSV</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {columns.map(col => (
          <Card key={col.id} className="bg-white shadow-md">
            <CardContent>
              <h2 className="font-bold text-lg mb-2">{col.title}</h2>
              <div className="space-y-2">
                {col.tasks.filter(task =>
                  task.name.toLowerCase().includes(filter.toLowerCase()) ||
                  task.employee.toLowerCase().includes(filter.toLowerCase())
                ).map((task, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{task.name}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeTask(col.id, index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm mt-1">👷 {task.employee} | 🛠 {task.role} | 🕒 {task.shift}</div>
                    <div className="text-sm">✅ {task.okQty} | ❌ {task.nokQty}</div>
                    <div className="text-sm">🗓️ {task.deadline || 'Brak terminu'}</div>
                    <div className="text-xs text-gray-600 italic">📝 {task.notes}</div>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nowe zadanie"
                  />
                  <Button onClick={() => addTask(col.id)}>
                    <Plus className="h-4 w-4 mr-1" /> Dodaj
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="my-6 p-4 bg-white shadow rounded">
        <h3 className="font-bold text-lg mb-2">📈 Wykres produkcji (OK vs NOK)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="OK" fill="#4ade80" />
            <Bar dataKey="NOK" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="my-6 p-4 bg-white shadow rounded">
        <h3 className="font-bold text-lg mb-2">🗓️ Raport z terminami</h3>

        <div className="mb-3">
          <label className="font-semibold mr-2">Filtruj status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border px-2 py-1 rounded">
            <option value="Wszystkie">Wszystkie</option>
            <option value="Po terminie">Po terminie</option>
            <option value="Dzisiaj">Dzisiaj</option>
            <option value="W terminie">W terminie</option>
          </select>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1">Zadanie</th>
              <th className="text-left py-1">Termin</th>
              <th className="text-left py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSummary.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="py-1">{row.name}</td>
                <td className="py-1">{row.deadline}</td>
                <td className={`py-1 ${row.daysLeft < 0 ? 'text-red-500' : row.daysLeft === 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
