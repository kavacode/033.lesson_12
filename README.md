**# 033.lesson_12**

The corresponding project code is located in the archive code.zip.

The file script.js contains the following data:

- users - an array of system users.
- roles - an object representing user roles.
- gradation - an object with a range of grades.
- What needs to be done is to render a corresponding block for each user from the users array.

For each user in the block, we display:

- User image - the img property.
- User name - the name property.
- User age - the age property.
- User role - the role property.
- If the user has the courses property, we display a list of completed courses.

Create a main class called User, which will have the methods render and renderCourses.

For each role, create a separate class: Student, Lector, and Admin, which inherit from the User class.

In the Lector and Admin classes, override the renderCourses method to display the list of courses in the desired format.

You can modify the provided HTML markup and CSS classes for each block as you wish. The main goal is to visually display it as shown in the image.
