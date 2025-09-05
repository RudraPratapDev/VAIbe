
import { db } from "@/db";
import {   agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_MAX_SIZE, PAGE_MIN_SIZE } from "@/constants";

import { TRPCError } from "@trpc/server";
import { meetingsUpdateSchema,meetingsInsertSchema } from "../schemas";
import { MeetingStatus } from "../types";



export const meetingsRouter=createTRPCRouter({

    remove:protectedProcedure.input(z.object({
        id:z.string()
    })).mutation(async({input,ctx})=>{
                const [removedMeeting]=await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id,input.id),
                        eq(meetings.userId,ctx.auth.user.id)
                    )
                );

                if(!removedMeeting) throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" });

                await db
                .delete(meetings)
                .where(eq(meetings.id,input.id));

                return { success: true };
            }),
            update:protectedProcedure.input(meetingsUpdateSchema).mutation(async({input,ctx})=>{
                const [existingMeeting]=await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id,input.id),
                        eq(meetings.userId,ctx.auth.user.id)
                    )
                );

                if(!existingMeeting) throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" });

                await db
                .update(meetings)
                .set({...input})
                .where(eq(meetings.id,input.id));

                return { success: true };
            }),


    getMany:protectedProcedure
    .input(z.object({
        page:z.number().default(DEFAULT_PAGE),
        pageSize:z
        .number()
        .min(PAGE_MIN_SIZE)
        .max(PAGE_MAX_SIZE)
        .default(DEFAULT_PAGE_SIZE),
        search:z.string().nullish(),
        agentId:z.string().nullish(),
        status:z.enum([MeetingStatus.upcoming,MeetingStatus.active,MeetingStatus.completed,MeetingStatus.processing,MeetingStatus.cancelled]).nullish(),
    }))
    .query(async({ctx,input})=>{
        const{page,pageSize,search,agentId,status}=input;
        const data=await db
        .select({
     
            ...getTableColumns(meetings),
            agent:agents,
            duration:sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
        })
        .from(meetings)
        .innerJoin(agents,eq(agents.id,meetings.agentId))
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search?ilike(meetings.name,`%${search}%`):undefined,
                status?eq(meetings.status,status):undefined,
                agentId?eq(meetings.agentId,agentId):undefined,
            )
        )
        .orderBy(desc(meetings.createdAt),desc(meetings.id))
        .limit(pageSize)
        .offset((page-1)*pageSize)

        const [total]=await db
        .select({count:count()})
        .from(meetings)
        .innerJoin(agents,eq(agents.id,meetings.agentId))
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search?ilike(meetings.name,`%${search}%`):undefined,
                status?eq(meetings.status,status):undefined,
                agentId?eq(meetings.agentId,agentId):undefined,
            )
        );
        const totalPages=Math.ceil(total.count/pageSize);
        return{
            items:data,
            total:total.count,
            totalPages,
        };

    }),

    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{
        const [existingMeeting]=await db
        .select({
            ...getTableColumns(meetings),
            agent:agents,
            duration:sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
        })
        .from(meetings)
        .innerJoin(agents,eq(agents.id,meetings.agentId))
        .where(
            and(
                eq(meetings.id,input.id),
                eq(meetings.userId,ctx.auth.user.id)
            )
        );

        if(!existingMeeting) throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" });

        return existingMeeting;
    }),

    create:protectedProcedure
        .input(meetingsInsertSchema)
        .mutation(async({input,ctx})=>{
            const [createdMeeting]=await db
            .insert(meetings)
            .values({...input,userId:ctx.auth.user.id})
            .returning();

            return createdMeeting;
        }),

        

   
})