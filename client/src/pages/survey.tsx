import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSurveySchema, type InsertSurvey } from "@shared/schema";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Survey() {
  const { toast } = useToast();
  const form = useForm<InsertSurvey>({
    resolver: zodResolver(insertSurveySchema),
    defaultValues: {
      name: "",
      civilStatus: "",
      sex: "",
      age: "",
      hhMember: "",
      fishR: "",
      boatR: "",
      nameAssoc: "",
      totalMember: "",
      province: "",
      municipality: "",
      baranggay: "",
      projectReceived: "",
      specProject: "",
      noUnitsReceived: "",
      dateReceived: "",
      mainIncome: "",
      otherIncome: "",
      quantity: "",
      quantityReason: "",
      quantityRating: "",
      quality: "",
      qualityReason: "",
      qualityRating: "",
      q2: "",
      q2Reason: "",
      timelinessRating: "",
      uponRequest: "",
      q3: "",
      q3Reason: "",
      challenges: "",
      relevanceRating: "",
      q4: "",
      q4Reason: "",
      q5: "",
      q5Reason: "",
      coherenceRating: "",
      q6: "",
      q6Reason: ""
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertSurvey) => {
      const response = await apiRequest("POST", "/api/surveys", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Survey submitted successfully"
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit survey",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertSurvey) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-8">
            Field Monitoring and Evaluation Form
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Beneficiary Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold bg-primary text-primary-foreground p-2">
                  Beneficiary Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="civilStatus">Civil Status</Label>
                    <Input
                      id="civilStatus"
                      {...form.register("civilStatus")}
                      placeholder="Civil Status"
                    />
                  </div>
                </div>

                {/* Add similar blocks for other form fields */}
                {/* Project Efficiency */}
                <h2 className="text-lg font-semibold bg-primary text-primary-foreground p-2 mt-8">
                  Project Efficiency
                </h2>

                <div className="space-y-4">
                  <Label>Is the quantity sufficient/enough?</Label>
                  <RadioGroup
                    onValueChange={(value) => form.setValue("quantity", value)}
                    defaultValue={form.getValues("quantity")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="quantity-yes" />
                      <Label htmlFor="quantity-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="quantity-no" />
                      <Label htmlFor="quantity-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Add remaining form sections */}
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Survey"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}