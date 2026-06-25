import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth/login')
  }

  // جلب بيانات الحساب الشخصي من قاعدة البيانات
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 max-w-7xl mx-auto bg-zinc-950 min-h-screen text-zinc-100" dir="rtl">
      {/* هيدر الترحيب بأسلوب منصة Skool */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-850">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">أهلاً بك مجدداً، {profile?.full_name || 'مستشار تقني'}!</h1>
          <p className="text-sm text-zinc-400 mt-1">تابع إنجازاتك التعليمية وتفاعل مع مجتمع "وصلة" اليوم.</p>
        </div>
        
        {/* نظام النقاط والمستوى - Gamification Engine */}
        <div className="flex items-center gap-4 bg-orange-500/10 px-4 py-2 rounded-lg border border-orange-500/20 w-full md:w-auto justify-between md:justify-start">
          <div className="text-right">
            <p className="text-xs text-zinc-450">المستوى الحالي</p>
            <p className="text-base md:text-lg font-bold text-orange-500">المستوى {profile?.level || 1}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-black text-xs shadow-md">
            {profile?.points || 0} XP
          </div>
        </div>
      </header>

      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-850">
          <h3 className="text-xs md:text-sm font-medium text-zinc-400">الدورات المسجلة</h3>
          <p className="text-xl md:text-2xl font-bold mt-2">4 دورات نشطة</p>
        </div>
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-850">
          <h3 className="text-xs md:text-sm font-medium text-zinc-400">المشاركات المجتمعية</h3>
          <p className="text-xl md:text-2xl font-bold mt-2">12 منشور ونقاش</p>
        </div>
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-850 sm:col-span-2 lg:col-span-1">
          <h3 className="text-xs md:text-sm font-medium text-zinc-400">ترتيبك في لوحة الصدارة</h3>
          <p className="text-xl md:text-2xl font-bold mt-2">#5 بين زملائك</p>
        </div>
      </div>

      {/* محتوى المجتمع وجدول الفعاليات */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* قسم آخر المنشورات في مجتمع الفيد */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg md:text-xl font-bold">آخر مستجدات مجتمعك التعليمي</h2>
          <div className="p-5 md:p-6 bg-zinc-900 rounded-xl border border-zinc-850 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm text-orange-500">م</div>
              <div>
                <h4 className="text-xs md:text-sm font-semibold">محمد أحمد (مستشار تقني)</h4>
                <p className="text-[10px] md:text-xs text-zinc-500">منذ ساعتين</p>
              </div>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-zinc-300">
              كيف تقوم بإعداد وإدارة متغيرات البيئة في مشاريع Next.js بشكل آمن تماماً عند الرفع على منصة Vercel؟ شاركونا تجاربكم بالتعليقات أدناه!
            </p>
          </div>
        </div>

        {/* المفكرة وأحداث التقويم القادمة */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold">الأحداث المجدولة القادمة</h2>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-850 space-y-3">
            <div className="p-3 bg-zinc-950 rounded-lg border-r-4 border-orange-500">
              <h4 className="text-xs md:text-sm font-semibold">جلسة بث مباشر لمراجعة كود المشاريع</h4>
              <p className="text-[11px] text-zinc-400 mt-1">اليوم في تمام الساعة 8:00 مساءً</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}