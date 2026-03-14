"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { contactApi, type ContactMessageItem } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function DashboardMessagesPage() {
  const [list, setList] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await contactApi.list();
      setList(data);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await contactApi.delete(id);
      setList((prev) => prev.filter((item) => item._id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete message");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Mail className="size-5" />
        <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        {list.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No contact messages yet.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Sender
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Message
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Received
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item) => (
                      <tr key={item._id} className="border-b last:border-b-0 align-top">
                        <td className="px-4 py-3 font-medium whitespace-nowrap">
                          {item.senderEmail}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          <p className="max-w-xl whitespace-pre-wrap break-words">
                            {item.message}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(item._id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              aria-label="Delete message"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
