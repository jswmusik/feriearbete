'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, Shield, Trash2, Download } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-8">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-900">{t('title')}</h1>
          <p className="text-slate-500">{t('subtitle')}</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white border-2 border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="account" className="data-[state=active]:bg-purple-light data-[state=active]:text-primary rounded-lg font-bold">
              {t('account')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-light data-[state=active]:text-primary rounded-lg font-bold">
              {t('notifications')}
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-purple-light data-[state=active]:text-primary rounded-lg font-bold">
              {t('privacy')}
            </TabsTrigger>
          </TabsList>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications">
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-tiffany/10 rounded-lg flex items-center justify-center text-tiffany">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{t('notifications')}</CardTitle>
                    <CardDescription>{t('notificationsDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('notificationsEmail')}</Label>
                    <p className="text-sm text-slate-500">{t('emailDesc')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('notificationsSms')}</Label>
                    <p className="text-sm text-slate-500">{t('smsDesc')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('marketing')}</Label>
                    <p className="text-sm text-slate-500">{t('marketingDesc')}</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t border-slate-100 p-4">
                <Button className="ml-auto">{tCommon('save')}</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ACCOUNT TAB */}
          <TabsContent value="account">
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{t('changePassword')}</CardTitle>
                    <CardDescription>{t('passwordDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('currentPassword')}</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>{t('newPassword')}</Label>
                  <Input type="password" />
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t border-slate-100 p-4">
                <Button className="ml-auto">{tCommon('save')}</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* PRIVACY TAB */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card className="border-2 border-slate-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{t('privacy')}</CardTitle>
                      <CardDescription>{t('privacyDesc')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full justify-between group">
                    {t('exportData')}
                    <Download className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-100 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="text-red-600 text-lg">{t('dangerZone')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{t('deleteAccount')}</p>
                      <p className="text-sm text-slate-500">{t('deleteAccountDesc')}</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" /> {tCommon('delete')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

