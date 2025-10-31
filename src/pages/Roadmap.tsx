import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatBotWidget from '@/components/ChatBotWidget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RoadmapStep {
  id: string;
  level: string;
  step_number: number;
  title: string;
  description: string;
  resources: string[] | any;
}

const Roadmap = () => {
  const [steps, setSteps] = useState<Record<string, RoadmapStep[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('N5');

  const levels = [
    { value: 'N5', label: 'N5 - Sơ cấp', color: 'bg-green-500' },
    { value: 'N4', label: 'N4 - Tiền trung cấp', color: 'bg-blue-500' },
    { value: 'N3', label: 'N3 - Trung cấp', color: 'bg-yellow-500' },
    { value: 'N2', label: 'N2 - Tiền cao cấp', color: 'bg-orange-500' },
    { value: 'N1', label: 'N1 - Cao cấp', color: 'bg-red-500' },
  ];

  useEffect(() => {
    fetchRoadmapSteps();
  }, []);

  const fetchRoadmapSteps = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('roadmap_steps')
        .select('*')
        .order('level', { ascending: true })
        .order('step_number', { ascending: true });

      if (error) throw error;

      // Group steps by level
      const grouped = data?.reduce((acc, step) => {
        if (!acc[step.level]) {
          acc[step.level] = [];
        }
        // Parse resources if it's a JSON string
        const resources = typeof step.resources === 'string' 
          ? JSON.parse(step.resources) 
          : Array.isArray(step.resources) 
            ? step.resources 
            : [];
        
        acc[step.level].push({
          ...step,
          resources
        });
        return acc;
      }, {} as Record<string, RoadmapStep[]>) || {};

      setSteps(grouped);
    } catch (error: any) {
      toast.error('Không thể tải lộ trình: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Lộ Trình Học <span className="text-primary">学習ロードマップ</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Hành trình chinh phục tiếng Nhật từ N5 đến N1
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Đang tải lộ trình...</p>
              </div>
            ) : (
              <Tabs value={activeLevel} onValueChange={setActiveLevel}>
                <TabsList className="grid w-full grid-cols-5">
                  {levels.map((level) => (
                    <TabsTrigger key={level.value} value={level.value}>
                      {level.value}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {levels.map((level) => (
                  <TabsContent key={level.value} value={level.value} className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      <h2 className="text-2xl font-bold">{level.label}</h2>
                    </div>

                    {steps[level.value]?.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {steps[level.value].map((step, idx) => (
                          <Card
                            key={step.id}
                            className="animate-slide-up hover:shadow-lg transition-all"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">Bước {step.step_number}</Badge>
                                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <CardTitle className="text-xl">{step.title}</CardTitle>
                                  <CardDescription className="text-base mt-2">
                                    {step.description}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <p className="font-semibold text-sm">📚 Tài liệu:</p>
                                <ul className="space-y-1">
                                  {step.resources.map((resource, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary">•</span>
                                      <span>{resource}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-12">
                          <p className="text-muted-foreground">
                            Chưa có bước nào cho trình độ này
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      </main>

      <ChatBotWidget />
    </div>
  );
};

export default Roadmap;
