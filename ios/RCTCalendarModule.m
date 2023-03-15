// RCTCalendarModule.m
#import <React/RCTLog.h>
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

// To export a module named CalendarModuleFoo
RCT_EXPORT_MODULE(CalendarModuleFoo);

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

//RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
//{
//return [[UIDevice currentDevice] name];
//}

@end
