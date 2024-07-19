import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Center, Box, Heading, Input, Button, VStack, HStack, List, ListItem, Checkbox, Text, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';

interface Task {
  text: string;
  completed: boolean;
}

const TodoPage: NextPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [task, setTask] = React.useState<string>('');

  // Load tasks from localStorage on component mount
  React.useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <>
      <NextSeo title="To-Do List" titleTemplate="%s" />
      <Center minH="100vh" flexDirection="column" p={8}>
        <Box textAlign="center" p={4} mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            To-Do List
          </Heading>
          <Text fontSize="lg" mb={6}>
            Manage your tasks effectively with this simple To-Do list.
          </Text>
        </Box>

        <VStack spacing={8} maxW="container.md" align="center">
          <Box textAlign="left" width="100%">
            <HStack>
              <Input
                placeholder="Enter a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button onClick={addTask} backgroundColor="#FF4545" color="white">
                Add Task
              </Button>
            </HStack>
          </Box>

          <Box textAlign="center" width="100%">
            <List spacing={3} width="100%">
              {tasks.map((task, index) => (
                <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
                  <Checkbox
                    isChecked={task.completed}
                    onChange={() => toggleTask(index)}
                  >
                    <Box as="span" textDecoration={task.completed ? 'line-through' : 'none'}>
                      {task.text}
                    </Box>
                  </Checkbox>
                  <Button size="sm" colorScheme="red" onClick={() => removeTask(index)}>
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </VStack>

        <Box textAlign="center" mt={8}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button backgroundColor="#FF4545" color="white">
              Go Back
            </Button>
          </Link>
        </Box>
      </Center>
    </>
  );
};

export default TodoPage
