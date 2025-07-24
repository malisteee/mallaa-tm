document.addEventListener("DOMContentLoaded", () => {
  // Bloquea cursos con prerrequisitos
  document.querySelectorAll(".course[data-prereq]").forEach(course => {
    course.classList.add("locked");
  });

  updateProgress();
});

function toggleCourse(element) {
  const courseId = element.getAttribute("data-id");

  if (element.classList.contains("completed")) {
    element.classList.remove("completed");
  } else {
    element.classList.add("completed");
  }

  // Desbloquear cursos que dependan de este
  document.querySelectorAll(`.course[data-prereq]`).forEach(course => {
    const prereqs = course.getAttribute("data-prereq").split(",");
    const allPassed = prereqs.every(id => {
      const prereqCourse = document.querySelector(`.course[data-id="${id.trim()}"]`);
      return prereqCourse && prereqCourse.classList.contains("completed");
    });

    if (allPassed) {
      course.classList.remove("locked");
    } else {
      course.classList.add("locked");
      course.classList.remove("completed");
    }
  });

  updateProgress();
}

function updateProgress() {
  const allCourses = document.querySelectorAll(".course");
  const validCourses = Array.from(allCourses).filter(c => !c.classList.contains("locked"));
  const completedCourses = validCourses.filter(c => c.classList.contains("completed"));

  const percent = validCourses.length > 0 ? Math.round((completedCourses.length / validCourses.length) * 100) : 0;

  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-text").textContent = percent + "% completado";
}
