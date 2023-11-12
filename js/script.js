const roles = {
  admin: "https://cdn-icons-png.flaticon.com/512/1424/1424467.png",
  student: "https://cdn-icons-png.flaticon.com/512/1424/1424482.png",
  lector: "https://cdn-icons-png.flaticon.com/512/1424/1424455.png",
};

const gradation = {
  20: "satisfactory",
  55: "good",
  85: "very-good",
  100: "excellent",
};

const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 20,
      },
      {
        title: "Java Enterprise",
        mark: 100,
      },
    ],
  },
  {
    name: "Amal Smith",
    age: 20,
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    role: "student",
  },
  {
    name: "Noah Smith",
    age: 43,
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 50,
      },
    ],
  },
  {
    name: "Charlie Smith",
    age: 18,
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 75,
      },
      {
        title: "Java Enterprise",
        mark: 23,
      },
    ],
  },
  {
    name: "Emily Smith",
    age: 30,
    img: "https://cdn-icons-png.flaticon.com/512/4202/4202850.png",
    role: "admin",
    courses: [
      {
        title: "Front-end Pro",
        score: 10,
        lector: "Leo Smith",
      },
      {
        title: "Java Enterprise",
        score: 50,
        lector: "David Smith",
      },
      {
        title: "QA",
        score: 75,
        lector: "Emilie Smith",
      },
    ],
  },
  {
    name: "Leo Smith",
    age: 253,
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    role: "lector",
    courses: [
      {
        title: "Front-end Pro",
        score: 78,
        studentsScore: 79,
      },
      {
        title: "Java Enterprise",
        score: 85,
        studentsScore: 85,
      },
    ],
  },
];
class User {
  constructor(user) {
    this.user = user;
  }

  render() {
    const usersContainer = document.querySelector(".users");
    //   if (!usersContainer) {
    // 	 console.error("Container with class 'users' not found.");
    // 	 return;
    //   }

    const userContainer = document.createElement("div");
    const userInfoContainer = document.createElement("div");
    userContainer.className = "user";
    userInfoContainer.className = "user__info";
    userInfoContainer.innerHTML = `
		 <div class="user__info--data">
			<img
			  src="${this.user.img}"
			  alt="${this.user.name}"
			  height="50"
			/>
			<div class="user__naming">
			  <p>Name: <b>${this.user.name}</b></p>
			  <p>Age: <b>${this.user.age}</b></p>
			</div>
		 </div>
		 <div class="user__info--role ${this.user.role}">
			<img
			  src="${roles[this.user.role]}"
			  alt="${this.user.role}"
			  height="25"
			/>
			<p>${this.user.role}</p>
		 </div>
	  `;
    userContainer.appendChild(userInfoContainer);
    if (this.user.courses) {
      const userInfoElement = document.createElement("div");
      userInfoElement.className = `user__courses ${this.user.role}--info`;
      userInfoElement.innerHTML = this.renderCourses();
      userContainer.appendChild(userInfoElement);
    }
    usersContainer.appendChild(userContainer);
  }

  renderCourses() {
    return "";
  }

  setAssessment(mark) {
    if (mark > 85) {
      return 100;
    } else if (mark > 55) {
      return 85;
    } else {
      return 20;
    }
  }
}

class Student extends User {
  renderCourses() {
    if (!this.user.courses) {
      return "";
    }

    const courses = this.user.courses;
    const itemCourses = courses.map((element) => {
      const descriptionMark = gradation[this.setAssessment(element.mark)];
      return `
			<p class="user__courses--course student">
			  ${element.title} <span class="${descriptionMark}">${descriptionMark}</span>
			</p>
		 `;
    });

    return itemCourses.join("");
  }
}

class Admin extends User {
  renderCourses() {
    if (!this.user.courses) {
      return "";
    }
    const courses = this.user.courses;
    const itemCourses = courses.map((element) => {
      const descriptionScore = gradation[this.setAssessment(element.score)];
      return `
			<div class="user__courses--course ${this.user.role}">
			  <p>Title: <b>${element.title}</b></p>
			  <p>Admin's score: <span class="${descriptionScore}">${descriptionScore}</span></p>
			  <p>Lector: <b>${element.lector}</b></p>
			</div>
		 `;
    });

    return itemCourses.join("");
  }
}

class Lector extends User {
  renderCourses() {
    if (!this.user.courses) {
      return "";
    }
    const courses = this.user.courses;
    const itemCourses = courses.map((element) => {
      const descriptionScore = gradation[this.setAssessment(element.score)];
      const descriptionStudentScore =
        gradation[this.setAssessment(element.studentsScore)];
      return `
			<div class="user__courses--course ${this.user.role}">
			  <p>Title: <b>${element.title}</b></p>
			  <p>Lector's score: <span class="${descriptionScore}">${descriptionScore}</span></p>
			  <p>Average student's score: <span class="${descriptionStudentScore}">${descriptionStudentScore}</span></p>
			</div>
		 `;
    });
    return itemCourses.join("");
  }
}

users.forEach((userData) => {
  let user;
  if (userData.role === "student") {
    user = new Student(userData);
  } else if (userData.role === "lector") {
    user = new Lector(userData);
  } else if (userData.role === "admin") {
    user = new Admin(userData);
  }
  user.render();
});
