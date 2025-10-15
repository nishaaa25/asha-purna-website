import Home from "@/components/pages/Home/Home";
import { getFeaturedProjects, getHomeData } from "@/lib/services/homeService";

export default async function page() {
  // Fetch all home data
  const result = await getHomeData();
  // console.log(result?.data);
  // console.log(result?.data?.project_image_path );
  // const featured = getFeaturedProjects(result.data);
  return (
    <div className="relative w-full">
      <Home
        featuredProjects={result?.data?.getProjects}
        imagePath={result?.data?.project_image_path}
        utsavImagePath={result?.data?.utsav_camps_image_path}
        events={result?.data?.getUtsavCamps}
      />
    </div>
  );
}
