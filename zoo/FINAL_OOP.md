Task: Create a Zoo System
Requirements:

1. Animal
   all animals have:

- name;
- age;

all animals can:

- makeSound;

//////////////////////////////////

2. One group of animals can:

- Sleep and walk;

  Other group of animals can:

- Jump and run;

  Third group of animals can:

- Swim and hunt;

///////////////////////////////////

3. Animals exists in zoo: Zebra, Tiger, Elephant;

- Zebra additional info: max speed and origin;
- Elephant additional info: weight;
- Tiger has to have a status if he was outside from the cage in the past 8h;

3. Create employee abstract class Employee. Employee all employees should have methods(some of them might be abstract): enterZoo(), leaveZoo(), takeSafetyTrainings(). Also it should have properties: isEmployeeAtZoo, safetyTrainingCompletionDate;

4. Zookeeper should implement Employee abstract class. Zookeeper should be able to feed the animals. There should be a log recording which animal was fed and at what time.

5. Create Employees and Animals class dedicated for storing created animals and employees;

6. Create 2 forms. One for employee creation and other for animals. Created data respectively should appear in Employees or Animals class.

7. Create 2 buttons which logs all animals and all employees.

8. Instead of using simple console logs, create a singleton logger that accepts a logger class instance and prints messages through it. Each message should be saved into an array to simulate a database.
