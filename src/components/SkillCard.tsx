import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  titleJp: string;
  description: string;
  delay?: number;
  link: string;
}

const SkillCard = ({ icon: Icon, title, titleJp, description, delay = 0, link }: SkillCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 hover:-translate-y-2 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl">
          {title} <span className="text-primary">{titleJp}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full group-hover:border-primary group-hover:text-primary"
          onClick={() => navigate(link)}
        >
          Bắt Đầu Học
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
