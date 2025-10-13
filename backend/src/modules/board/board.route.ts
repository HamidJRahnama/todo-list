import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.ts";
import validationMiddleware from "../../middlewares/validateMiddleware.ts";
import { 
    createBoardController, 
    deleteBoardController, 
    getBoardByIdController, 
    getBoardsController, 
    updateBoardController 
} from "./board.controller.ts";
import { CreateBoardDto, UpdateBoardDto } from "./dto/CreateBoardDto.ts";

const router = Router();

// تمام این مسیرها نیاز به احراز هویت دارن
router.use(authMiddleware); 

router.get('/', getBoardsController);
router.get('/:id', getBoardByIdController);
router.post('/', validationMiddleware(CreateBoardDto) , createBoardController);
router.put('/:id',validationMiddleware(UpdateBoardDto), updateBoardController); // PATCH برای آپدیت جزئی بهتره
router.delete('/:id', deleteBoardController);

export default router;