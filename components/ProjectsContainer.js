import Image from "next/image";

export default function ProjectsContainer({ projects }) {
  return (
    <div>
      {projects.map((project) => {
        <div key={project.id}>
          <div>
            <Image src={project.imgUrl} alt={project.projectType} />
          </div>
          <div className="project-content">
            <div>
              <Image
                src="/assets/location.svg"
                alt="location-icon"
                width={20}
                height={20}
                className="relative object-contain"
              />
              <span>{project.projectLocation}</span>
            </div>
            <h3>{project.projectName}</h3>
            <p>{project.projectType}</p>
          </div>
        </div>;
      })}
    </div>
  );
}
