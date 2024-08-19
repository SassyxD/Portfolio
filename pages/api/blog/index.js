import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";

export default function handler(req, res) {
  const postsfolder = join(process.cwd(), `/_posts/${uuidv4()}.md`);
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      const data = matter.stringify("# New Blog", {
        date: new Date().toISOString(),
        title: "SassyxD",
        tagline: "Personal Portfolio",
        preview:
          "I am a motivated sophomore at King Mongkut's Institute of Technology Ladkrabang (KMITL) with a growing passion for software development. I am actively seeking part-time opportunities to apply and expand my skills in full-stack development. With hands-on experience in React.js, Next.js, Node.js, and MySQL, I am eager to contribute to real-world projects and gain practical experience.",
        image: getRandomImage(),
      });
      fs.writeFileSync(postsfolder, data, (err) => console.error(err));
      res.status(200).json({ status: "CREATED" });
    }
    if (req.method === "DELETE") {
      const deleteFile = join(process.cwd(), `/_posts/${req.body.slug}.md`);
      fs.unlinkSync(deleteFile);
      res.status(200).json({ status: "DONE" });
    }
  } else {
    res.status(200).json({ name: "This route works in development mode only" });
  }
}
