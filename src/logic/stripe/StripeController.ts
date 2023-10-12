import { StripeCustomerPayload, StripePaymentIntentPayload, StripeRepository } from "./StripeRepository";
import { PaymentIntentDTO } from "./paymentIntentDTO";

export class StripeController {

    private stripeRepository: StripeRepository;

    constructor(stripeRepo: StripeRepository) {
        this.stripeRepository = stripeRepo;
    }

    async createCustomer(payload: StripeCustomerPayload): Promise<string> {
        return await this.stripeRepository.createCustomer(payload);
    }

    async createPaymentIntent(payload: StripePaymentIntentPayload): Promise<PaymentIntentDTO> {
        return await this.stripeRepository.createPaymentIntent(payload);
    }
}

export const stripeController = new StripeController(new StripeRepository());