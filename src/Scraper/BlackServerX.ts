import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import * as cheerio from "cheerio"
import { BlackServerXResponse } from "../Types/Scraper/BlackServerX"

export default new class BlackServerX {
    private cookies: string | null = null
    private xsrfToken: string | null = null
    private readonly baseUrl: string = "https://blackserverx.com/"
    private email: string
    private password: string

    constructor(email: string = "", password: string = "") {
        this.email = email
        this.password = password
    }

    #cookies(response: AxiosResponse): void {
        const headers = response.headers as Record<string, string | string[]>
        const setCookie = headers["set-cookie"]
        if (Array.isArray(setCookie) && setCookie.length) {
            this.cookies = setCookie.join("; ")
            const xsrfCookie = setCookie.find(c => c.startsWith("XSRF-TOKEN="))
            if (xsrfCookie) {
                const raw = xsrfCookie.split(";")[0].split("=")[1]
                this.xsrfToken = decodeURIComponent(raw)
            }
        }
    }

    async #request(url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        const response = await axios({
            method: options.method || "GET",
            url,
            data: options.data,
            headers: {
                accept: "application/json, text/html, */*",
                cookie: this.cookies || "",
                referer: this.baseUrl,
                "x-inbox-lifespan": "600",
                "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
                "sec-ch-ua-mobile": "?1",
                ...(this.xsrfToken ? { "X-XSRF-TOKEN": this.xsrfToken } : {}),
                ...options.headers
            }
        })
        this.#cookies(response)
        return response
    }

    async initialize(): Promise<void> {
        const response = await this.#request(this.baseUrl)
        const $ = cheerio.load(response.data)
        const token = $('meta[name="csrf-token"]').attr("content")
        if (token) this.xsrfToken = token
    }

    async login(): Promise<BlackServerXResponse> {
        const { data } = await this.#request(this.baseUrl + "customer/login/request", {
            method: "POST",
            data: {
                email: this.email,
                password: this.password
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })

        return data
    }

    async order(serviceID: string, prueba: string): Promise<AxiosResponse> {
        const response = await this.#request(this.baseUrl + "create/order", { method: "GET" })
        const $ = cheerio.load(response.data)
        const token = $('input[name="_token"]').val() as string
        return this.#request(this.baseUrl + "create/order", {
            method: "POST",
            data: {
                _token: token,
                serviceID,
                prueba
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
    }
}()
