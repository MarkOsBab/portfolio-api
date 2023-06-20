import VisibleEnum from "../enums/visible.enum.js";

interface ProjectInterface {
    name: string;
    description: string;
    links: string[];
    thumbnails: string[];
    visible: VisibleEnum;
}

export default ProjectInterface;