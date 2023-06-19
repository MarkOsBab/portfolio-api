import VisibleEnum from "../enums/visible.enum.js";

interface KnowledgeInterface {
    name: string;
    description: string;
    visible: VisibleEnum;
    category: string;
    thumbnail: string;
};

export default KnowledgeInterface;